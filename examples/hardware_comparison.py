#!/usr/bin/env python3
"""Compare simulator vs real quantum hardware results."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from qiskit_nature.second_q.drivers import Molecule
from qiskit_nature.second_q.drivers import ElectronicStructureMoleculeDriver
from qiskit_nature.second_q.mappers import JordanWignerMapper
from qiskit_nature.second_q.circuit.library import UCCSD, HartreeFock
from qiskit.algorithms.minimum_eigensolvers import VQE
from qiskit.algorithms.optimizers import COBYLA
from qiskit_aer import AerSimulator


def run_simulator_vqe():
    """Run VQE on Aer simulator."""
    print("Running VQE on Aer Simulator...")

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

    optimizer = COBYLA(maxiter=200)
    backend = AerSimulator()

    vqe = VQE(ansatz, optimizer, backend=backend)
    result = vqe.compute_minimum_eigenvalue(qubit_op)

    return result.eigenvalue.real


def run_ibm_hardware_vqe(token=None):
    """Run VQE on IBM Quantum hardware.

    Args:
        token: IBM Quantum API token

    Returns:
        Ground state energy from hardware
    """
    print("Running VQE on IBM Quantum Hardware...")

    try:
        from qiskit_ibm_runtime import QiskitRuntimeService, Sampler
    except ImportError:
        print("Error: qiskit-ibm-runtime not installed")
        return None

    if token:
        service = QiskitRuntimeService(channel="ibm_quantum", token=token)
    else:
        service = QiskitRuntimeService(channel="ibm_quantum")

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

    from qiskit.quantum_info import SparsePauliOp

    qubit_op_sparse = SparsePauliOp.from_operator(mapper.map(hamiltonian))

    sampler = Sampler()
    vqe = VQE(ansatz, optimizer=COBYLA(maxiter=100), sampler=sampler)
    result = vqe.compute_minimum_eigenvalue(qubit_op_sparse)

    return result.eigenvalue.real


def main():
    print("=" * 50)
    print("VQE: Simulator vs Hardware Comparison")
    print("=" * 50)

    simulator_energy = run_simulator_vqe()
    print(f"Simulator result: {simulator_energy:.6f} Ha")

    print("\nHardware execution requires IBM Quantum account.")
    print("Set IBM_TOKEN environment variable to run on real hardware.")

    hardware_energy = None
    if "IBM_TOKEN" in __import__("os").environ:
        token = __import__("os").environ.get("IBM_TOKEN")
        hardware_energy = run_ibm_hardware_vqe(token)

    print("\n" + "=" * 50)
    print("Comparison Summary")
    print("=" * 50)
    print(f"Simulator energy: {simulator_energy:.6f} Ha")

    if hardware_energy:
        print(f"Hardware energy: {hardware_energy:.6f} Ha")
        print(f"Difference: {abs(simulator_energy - hardware_energy):.6f} Ha")
    else:
        print("Hardware energy: Not available")


if __name__ == "__main__":
    main()
