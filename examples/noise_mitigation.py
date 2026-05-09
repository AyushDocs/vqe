#!/usr/bin/env python3
"""Noise mitigation techniques for VQE."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from qiskit_nature.second_q.drivers import Molecule, ElectronicStructureMoleculeDriver
from qiskit_nature.second_q.mappers import JordanWignerMapper
from qiskit_nature.second_q.circuit.library import UCCSD, HartreeFock
from qiskit.algorithms.minimum_eigensolvers import VQE
from qiskit.algorithms.optimizers import COBYLA
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error


def create_noise_model(depolarizing_prob=0.01):
    """Create a simple depolarizing noise model.

    Args:
        depolarizing_prob: Single qubit depolarizing probability

    Returns:
        NoiseModel
    """
    noise_model = NoiseModel()

    single_qubit_error = depolarizing_error(depolarizing_prob, 1)
    two_qubit_error = depolarizing_error(depolarizing_prob * 2, 2)

    noise_model.add_all_qubit_quantum_error(single_qubit_error, ["u1", "u2", "u3"])
    noise_model.add_all_qubit_quantum_error(two_qubit_error, ["cx"])

    return noise_model


def run_vqe_with_noise(maxiter=50, noise_prob=0.0):
    """Run VQE with optional noise model.

    Args:
        maxiter: Maximum optimizer iterations
        noise_prob: Depolarizing noise probability

    Returns:
        VQE energy result
    """
    molecule = Molecule(
        geometry=[["H", [0.0, 0.0, 0.0]], ["H", [0.735, 0.0, 0.0]]],
        charge=0,
        multiplicity=1,
    )

    driver = ElectronicStructureMoleculeDriver(
        molecule=molecule,
        basis="sto3g",
        method="HF",
    )

    problem = driver.run()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    initial_state = HartreeFock(
        num_spatial_orbitals=problem.num_spatial_orbitals,
        num_particles=problem.num_particles,
        mapper=mapper,
    )

    ansatz = UCCSD(
        num_spatial_orbitals=problem.num_spatial_orbitals,
        num_particles=problem.num_particles,
        mapper=mapper,
        initial_state=initial_state,
    )

    backend = AerSimulator()
    if noise_prob > 0:
        noise_model = create_noise_model(noise_prob)
        backend.set_options(noise_model=noise_model)

    optimizer = COBYLA(maxiter=maxiter)
    vqe = VQE(ansatz, optimizer, backend=backend)
    result = vqe.compute_minimum_eigenvalue(qubit_op)

    return result.eigenvalue.real


def main():
    print("=" * 60)
    print("VQE Noise Mitigation Comparison")
    print("=" * 60)

    from qiskit.algorithms.state_eigolvers import NumPyMinimumEigensolver

    molecule = Molecule(
        geometry=[["H", [0.0, 0.0, 0.0]], ["H", [0.735, 0.0, 0.0]]],
        charge=0,
        multiplicity=1,
    )

    driver = ElectronicStructureMoleculeDriver(
        molecule=molecule,
        basis="sto3g",
        method="HF",
    )
    problem = driver.run()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    exact_solver = NumPyMinimumEigensolver()
    exact_result = exact_solver.compute_minimum_eigenvalue(qubit_op)
    exact_energy = exact_result.eigenvalue.real

    print(f"Exact energy: {exact_energy:.6f} Ha")
    print()

    noise_levels = [0.0, 0.001, 0.005, 0.01, 0.02]

    results = []
    for noise_prob in noise_levels:
        print(f"Running with noise probability {noise_prob}...")
        energy = run_vqe_with_noise(maxiter=100, noise_prob=noise_prob)
        error = abs(energy - exact_energy)
        results.append((noise_prob, energy, error))
        print(f"  Energy: {energy:.6f} Ha, Error: {error:.6f} Ha")

    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"{'Noise Prob':<12} {'Energy':<15} {'Error':<15}")
    print("-" * 42)
    for noise_prob, energy, error in results:
        print(f"{noise_prob:<12.3f} {energy:<15.6f} {error:<15.6f}")


if __name__ == "__main__":
    main()
