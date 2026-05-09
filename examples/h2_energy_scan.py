#!/usr/bin/env python3
"""Potential Energy Surface scan for H2 molecule."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from vqe_h2.hamiltonian import build_hamiltonian
from vqe_h2.ansatz import build_ansatz
from vqe_h2.optimizer import run_vqe
from vqe_h2.visualization import plot_potential_energy_surface, export_results_csv
from qiskit_nature.second_q.mappers import JordanWignerMapper


def run_pes_scan(bond_distances, maxiter=100):
    """Run VQE across a range of bond distances.

    Args:
        bond_distances: List of H-H distances in Angstroms
        maxiter: Maximum iterations per VQE run

    Returns:
        Dictionary with results
    """
    results = {
        "bond_distances": [],
        "energies": [],
        "exact_energies": [],
    }

    mapper = JordanWignerMapper()

    for distance in bond_distances:
        print(f"Computing energy at bond distance {distance:.3f} Å...")

        problem = build_hamiltonian(bond_distance=distance)
        hamiltonian = problem.second_q_ops()[0]
        qubit_op = mapper.map(hamiltonian)

        ansatz = build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)

        vqe_result = run_vqe(qubit_op, ansatz, maxiter=maxiter)

        results["bond_distances"].append(distance)
        results["energies"].append(vqe_result.eigenvalue.real)

        from qiskit.algorithms.state_eigolvers import NumPyMinimumEigensolver

        exact_solver = NumPyMinimumEigensolver()
        exact_result = exact_solver.compute_minimum_eigenvalue(qubit_op)
        results["exact_energies"].append(exact_result.eigenvalue.real)

        print(f"  VQE: {vqe_result.eigenvalue.real:.6f} Ha")
        print(f"  Exact: {exact_result.eigenvalue.real:.6f} Ha")

    return results


def main():
    bond_distances = [0.5, 0.6, 0.7, 0.735, 0.8, 0.9, 1.0, 1.2, 1.4, 1.6]

    print("=" * 50)
    print("H2 Potential Energy Surface Scan")
    print("=" * 50)

    results = run_pes_scan(bond_distances, maxiter=100)

    print("\n" + "=" * 50)
    print("Results Summary")
    print("=" * 50)
    for i, d in enumerate(results["bond_distances"]):
        print(
            f"R = {d:.3f} Å: E = {results['energies'][i]:.6f} Ha "
            f"(Δ = {results['energies'][i] - results['exact_energies'][i]:.6f})"
        )

    plot_potential_energy_surface(
        results["bond_distances"],
        results["energies"],
        results["exact_energies"],
        save_path="h2_pes.png",
    )

    export_results_csv(results["energies"], results["bond_distances"], "h2_pes_results.csv")

    print("\nPlots saved to h2_pes.png")
    print("Data saved to h2_pes_results.csv")


if __name__ == "__main__":
    main()
