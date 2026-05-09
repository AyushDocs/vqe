"""Tests for hamiltonian module."""

from vqe_h2.hamiltonian import build_hamiltonian


def test_build_hamiltonian_default(h2_molecule_params):
    """Test building Hamiltonian with default parameters."""
    problem = build_hamiltonian()
    assert problem is not None
    assert problem.num_spatial_orbitals > 0
    assert problem.num_particles is not None


def test_build_hamiltonian_custom_bond_distance(h2_molecule_params):
    """Test building Hamiltonian with custom bond distance."""
    problem = build_hamiltonian(bond_distance=0.8)
    assert problem is not None


def test_build_hamiltonian_basis(h2_molecule_params):
    """Test building Hamiltonian with different basis."""
    problem = build_hamiltonian(basis="sto-3g")
    assert problem is not None


def test_hamiltonian_operators(h2_molecule_params):
    """Test that Hamiltonian produces valid operators."""
    problem = build_hamiltonian()
    ops = problem.second_q_ops()
    assert len(ops) > 0
