"""Benchmark script for VQE performance tracking."""

import json
import time
from datetime import datetime


def benchmark_hamiltonian_build():
    """Benchmark Hamiltonian construction."""
    from vqe_h2.hamiltonian import build_hamiltonian

    start = time.time()
    for _ in range(10):
        build_hamiltonian()
    elapsed = (time.time() - start) / 10

    return {"operation": "hamiltonian_build", "time_ms": elapsed * 1000}


def benchmark_ansatz_build():
    """Benchmark ansatz construction."""
    from qiskit_nature.second_q.mappers import JordanWignerMapper
    from vqe_h2.hamiltonian import build_hamiltonian
    from vqe_h2.ansatz import build_ansatz

    problem = build_hamiltonian()
    mapper = JordanWignerMapper()

    start = time.time()
    for _ in range(10):
        build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)
    elapsed = (time.time() - start) / 10

    return {"operation": "ansatz_build", "time_ms": elapsed * 1000}


def benchmark_vqe_execution(maxiter=50):
    """Benchmark VQE execution."""
    from qiskit_nature.second_q.mappers import JordanWignerMapper
    from vqe_h2.hamiltonian import build_hamiltonian
    from vqe_h2.ansatz import build_ansatz
    from vqe_h2.optimizer import run_vqe

    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    ansatz = build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)

    start = time.time()
    result = run_vqe(qubit_op, ansatz, maxiter=maxiter)
    elapsed = time.time() - start

    return {
        "operation": "vqe_execution",
        "time_s": elapsed,
        "iterations": maxiter,
        "energy": result.eigenvalue.real if result.eigenvalue else None,
    }


def run_all_benchmarks():
    """Run all benchmarks and return results."""
    results = {
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "benchmarks": [],
    }

    print("Running Hamiltonian benchmark...")
    results["benchmarks"].append(benchmark_hamiltonian_build())

    print("Running Ansatz benchmark...")
    results["benchmarks"].append(benchmark_ansatz_build())

    print("Running VQE benchmark (50 iterations)...")
    results["benchmarks"].append(benchmark_vqe_execution(maxiter=50))

    return results


def save_results(results, filepath="benchmark_results.json"):
    """Save benchmark results to file."""
    with open(filepath, "w") as f:
        json.dump(results, f, indent=2)
    print(f"Results saved to {filepath}")


if __name__ == "__main__":
    results = run_all_benchmarks()
    save_results(results)

    for b in results["benchmarks"]:
        print(
            f"{b['operation']}: {b.get('time_ms', b.get('time_s'))} "
            f"{'ms' if 'time_ms' in b else 's'}"
        )
