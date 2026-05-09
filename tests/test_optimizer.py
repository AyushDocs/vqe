"""Tests for optimizer module."""

import pytest
from qiskit_nature.second_q.mappers import JordanWignerMapper
from vqe_h2.optimizer import run_vqe
from vqe_h2.hamiltonian import build_hamiltonian
from vqe_h2.ansatz import build_ansatz


@pytest.mark.slow
def test_run_vqe_completes():
    """Test VQE optimization completes without error."""
    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    num_spatial_orbitals = problem.num_spatial_orbitals
    num_particles = problem.num_particles

    ansatz = build_ansatz(num_spatial_orbitals, num_particles, mapper)
    result = run_vqe(qubit_op, ansatz, maxiter=50)

    assert result is not None
    assert result.eigenvalue is not None


@pytest.mark.slow
def test_vqe_energy_in_expected_range():
    """Test VQE energy is in expected range."""
    problem = build_hamiltonian()
    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    num_spatial_orbitals = problem.num_spatial_orbitals
    num_particles = problem.num_particles

    ansatz = build_ansatz(num_spatial_orbitals, num_particles, mapper)
    result = run_vqe(qubit_op, ansatz, maxiter=100)

    energy = result.eigenvalue.real
    assert -1.2 < energy < -0.9
