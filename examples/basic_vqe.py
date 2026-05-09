#!/usr/bin/env python3
"""Basic VQE example for H2 molecule."""

from qiskit_nature.second_q.drivers import ElectronicStructureMoleculeDriver
from qiskit_nature.second_q.drivers import Molecule
from qiskit_nature.second_q.mappers import JordanWignerMapper
from qiskit_nature.second_q.circuit.library import UCCSD, HartreeFock
from qiskit.algorithms.minimum_eigensolvers import VQE
from qiskit.algorithms.optimizers import COBYLA
from qiskit_aer import AerSimulator


def run_vqe():
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

    num_spatial_orbitals = problem.num_spatial_orbitals
    num_particles = problem.num_particles

    initial_state = HartreeFock(
        num_spatial_orbitals=num_spatial_orbitals,
        num_particles=num_particles,
        mapper=mapper,
    )

    ansatz = UCCSD(
        num_spatial_orbitals=num_spatial_orbitals,
        num_particles=num_particles,
        mapper=mapper,
        initial_state=initial_state,
    )

    optimizer = COBYLA(maxiter=500)
    backend = AerSimulator()

    vqe = VQE(ansatz, optimizer, backend=backend)
    result = vqe.compute_minimum_eigenvalue(qubit_op)

    print(f"Ground state energy: {result.eigenvalue.real:.6f} Ha")
    print(f"Optimal parameters: {result.optimal_parameters}")


if __name__ == "__main__":
    run_vqe()
