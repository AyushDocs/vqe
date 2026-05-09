#!/usr/bin/env python3
"""LiH molecule VQE demonstration."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from vqe_h2.ansatz import build_ansatz
from vqe_h2.optimizer import run_vqe
from qiskit_nature.second_q.mappers import JordanWignerMapper
from qiskit.algorithms.state_eigolvers import NumPyMinimumEigensolver


def run_lih_vqe():
    """Run VQE for LiH molecule."""
    print("=" * 50)
    print("LiH Molecule VQE")
    print("=" * 50)

    molecule = [
        ["Li", [0.0, 0.0, 0.0]],
        ["H", [1.6, 0.0, 0.0]],
    ]

    from qiskit_nature.second_q.drivers import Molecule, ElectronicStructureMoleculeDriver

    qiskit_molecule = Molecule(
        geometry=molecule,
        charge=0,
        multiplicity=1,
    )

    driver = ElectronicStructureMoleculeDriver(
        molecule=qiskit_molecule,
        basis="sto3g",
        method="HF",
    )

    problem = driver.run()
    print(f"Number of spatial orbitals: {problem.num_spatial_orbitals}")
    print(f"Number of electrons: {problem.num_particles}")

    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)
    print(f"Number of qubits: {qubit_op.num_qubits}")

    exact_solver = NumPyMinimumEigensolver()
    exact_result = exact_solver.compute_minimum_eigenvalue(qubit_op)
    exact_energy = exact_result.eigenvalue.real
    print(f"\nExact ground state energy: {exact_energy:.6f} Ha")

    print("\nBuilding ansatz...")
    ansatz = build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)
    print(f"Ansatz parameters: {ansatz.num_parameters}")
    print(f"Ansatz depth: {ansatz.depth()}")

    print("\nRunning VQE (this may take a few minutes)...")
    result = run_vqe(qubit_op, ansatz, maxiter=100)
    vqe_energy = result.eigenvalue.real

    print("\n" + "=" * 50)
    print("Results")
    print("=" * 50)
    print(f"VQE energy: {vqe_energy:.6f} Ha")
    print(f"Exact energy: {exact_energy:.6f} Ha")
    print(f"Error: {abs(vqe_energy - exact_energy):.6f} Ha")
    print(f"Relative error: {abs(vqe_energy - exact_energy) / abs(exact_energy) * 100:.4f}%")


if __name__ == "__main__":
    run_lih_vqe()
