"""Visualization utilities for VQE results."""

import matplotlib.pyplot as plt


def plot_energy_convergence(energies, exact_energy, save_path=None):
    """Plot energy convergence during VQE optimization.

    Args:
        energies: List of energy values per iteration
        exact_energy: Exact ground state energy for reference
        save_path: Optional path to save figure
    """
    plt.figure(figsize=(10, 6))
    iterations = range(1, len(energies) + 1)

    plt.plot(iterations, energies, "b-", linewidth=2, label="VQE Energy")
    plt.axhline(y=exact_energy, color="r", linestyle="--", label=f"Exact ({exact_energy:.6f})")

    plt.xlabel("Iteration", fontsize=12)
    plt.ylabel("Energy (Hartree)", fontsize=12)
    plt.title("VQE Energy Convergence for H₂", fontsize=14)
    plt.legend(fontsize=10)
    plt.grid(True, alpha=0.3)

    if save_path:
        plt.savefig(save_path, dpi=150, bbox_inches="tight")
    plt.close()


def plot_potential_energy_surface(bond_distances, energies, exact_energies=None, save_path=None):
    """Plot potential energy surface for H₂.

    Args:
        bond_distances: List of H-H bond distances (Angstroms)
        energies: VQE computed energies
        exact_energies: Optional exact classical energies for comparison
        save_path: Optional path to save figure
    """
    plt.figure(figsize=(10, 6))

    plt.plot(bond_distances, energies, "b-o", linewidth=2, markersize=6, label="VQE")

    if exact_energies is not None:
        plt.plot(bond_distances, exact_energies, "r--", linewidth=2, label="Exact")

    plt.xlabel("Bond Distance (Å)", fontsize=12)
    plt.ylabel("Energy (Hartree)", fontsize=12)
    plt.title("H₂ Potential Energy Surface", fontsize=14)
    plt.legend(fontsize=10)
    plt.grid(True, alpha=0.3)

    if save_path:
        plt.savefig(save_path, dpi=150, bbox_inches="tight")
    plt.close()


def plot_error_gap(energies, exact_energy, save_path=None):
    """Plot error gap between VQE and exact energy.

    Args:
        energies: List of VQE energy values
        exact_energy: Exact ground state energy
        save_path: Optional path to save figure
    """
    error_gap = [e - exact_energy for e in energies]

    plt.figure(figsize=(10, 6))
    plt.semilogy(range(1, len(error_gap) + 1), error_gap, "b-", linewidth=2)

    plt.xlabel("Iteration", fontsize=12)
    plt.ylabel("Error Gap (Hartree)", fontsize=12)
    plt.title("VQE Convergence Error", fontsize=14)
    plt.grid(True, alpha=0.3)

    if save_path:
        plt.savefig(save_path, dpi=150, bbox_inches="tight")
    plt.close()


def plot_optimizer_comparison(results_dict, save_path=None):
    """Compare multiple optimizers.

    Args:
        results_dict: Dict with optimizer names as keys and (iterations, energies) as values
        save_path: Optional path to save figure
    """
    plt.figure(figsize=(12, 6))

    for optimizer, (iterations, energies) in results_dict.items():
        plt.plot(iterations, energies, "-o", label=optimizer, markersize=4)

    plt.xlabel("Iteration", fontsize=12)
    plt.ylabel("Energy (Hartree)", fontsize=12)
    plt.title("VQE Optimizer Comparison", fontsize=14)
    plt.legend(fontsize=10)
    plt.grid(True, alpha=0.3)

    if save_path:
        plt.savefig(save_path, dpi=150, bbox_inches="tight")
    plt.close()


def save_circuit_diagram(circuit, save_path):
    """Save circuit diagram as PNG.

    Args:
        circuit: Qiskit QuantumCircuit
        save_path: Path to save the image
    """
    from qiskit.visualization import circuit_drawer

    circuit_drawer(circuit, output="mpl", filename=save_path)


def export_results_json(results, filepath):
    """Export VQE results to JSON.

    Args:
        results: Dict containing VQE results
        filepath: Output file path
    """
    import json

    with open(filepath, "w") as f:
        json.dump(results, f, indent=2)


def export_results_csv(energies, bond_distances, filepath):
    """Export VQE results to CSV.

    Args:
        energies: List of energy values
        bond_distances: List of corresponding bond distances
        filepath: Output file path
    """
    import csv

    with open(filepath, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["bond_distance", "energy"])
        writer.writerows(zip(bond_distances, energies))
