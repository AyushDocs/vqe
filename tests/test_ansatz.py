"""Tests for ansatz module."""

from qiskit_nature.second_q.mappers import JordanWignerMapper
from vqe_h2.ansatz import build_ansatz
from vqe_h2.hamiltonian import build_hamiltonian


def test_build_ansatz():
    """Test building UCCSD ansatz."""
    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    num_spatial_orbitals = problem.num_spatial_orbitals
    num_particles = problem.num_particles

    ansatz = build_ansatz(num_spatial_orbitals, num_particles, mapper)
    assert ansatz is not None
    assert ansatz.num_parameters > 0


def test_ansatz_num_qubits():
    """Test ansatz has correct number of qubits."""
    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    num_spatial_orbitals = problem.num_spatial_orbitals
    num_particles = problem.num_particles

    ansatz = build_ansatz(num_spatial_orbitals, num_particles, mapper)
    assert ansatz.num_qubits == num_spatial_orbitals * 2


def test_ansatz_parameters():
    """Test ansatz has trainable parameters."""
    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    num_spatial_orbitals = problem.num_spatial_orbitals
    num_particles = problem.num_particles

    ansatz = build_ansatz(num_spatial_orbitals, num_particles, mapper)
    assert len(ansatz.parameters) > 0
