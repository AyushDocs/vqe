"""Pytest benchmarks for VQE performance."""

import pytest


@pytest.mark.benchmark
def test_hamiltonian_build_performance(benchmark):
    """Benchmark Hamiltonian construction."""
    from vqe_h2.hamiltonian import build_hamiltonian

    result = benchmark(build_hamiltonian)
    assert result is not None


@pytest.mark.benchmark
def test_ansatz_build_performance(benchmark):
    """Benchmark ansatz construction."""
    from qiskit_nature.second_q.mappers import JordanWignerMapper
    from vqe_h2.hamiltonian import build_hamiltonian
    from vqe_h2.ansatz import build_ansatz

    problem = build_hamiltonian()
    mapper = JordanWignerMapper()

    def build():
        return build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)

    result = benchmark(build)
    assert result is not None


@pytest.mark.slow
@pytest.mark.benchmark
def test_vqe_execution_performance(benchmark):
    """Benchmark VQE execution with 50 iterations."""
    from qiskit_nature.second_q.mappers import JordanWignerMapper
    from vqe_h2.hamiltonian import build_hamiltonian
    from vqe_h2.ansatz import build_ansatz
    from vqe_h2.optimizer import run_vqe

    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    ansatz = build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)

    def run():
        return run_vqe(qubit_op, ansatz, maxiter=50)

    result = benchmark(run)
    assert result is not None
    assert -1.5 < result.eigenvalue.real < -0.5


@pytest.mark.benchmark
def test_qubit_operator_mapping():
    """Benchmark qubit operator mapping performance."""
    from qiskit_nature.second_q.mappers import JordanWignerMapper
    from vqe_h2.hamiltonian import build_hamiltonian

    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]

    result = mapper.map(hamiltonian)
    assert result is not None
    assert result.num_qubits == 4
