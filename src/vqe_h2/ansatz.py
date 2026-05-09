"""Ansatz circuit construction."""

from qiskit_nature.second_q.circuit.library import UCCSD, HartreeFock


def build_ansatz(num_spatial_orbitals, num_particles, mapper):
    """Build VQE ansatz circuit.

    Args:
        num_spatial_orbitals: Number of spatial orbitals
        num_particles: Number of electrons
        mapper: Qubit mapper

    Returns:
        UCCSD ansatz circuit
    """
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

    return ansatz
