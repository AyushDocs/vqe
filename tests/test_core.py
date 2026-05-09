"""Tests for core module."""

from vqe_h2.core import build_hamiltonian, build_ansatz, run_vqe


def test_core_imports():
    """Test core module imports work."""
    assert build_hamiltonian is not None
    assert build_ansatz is not None
    assert run_vqe is not None


def test_build_hamiltonian_from_core():
    """Test core build_hamiltonian function."""
    problem = build_hamiltonian()
    assert problem is not None


def test_workflow_integration():
    """Test complete VQE workflow."""
    problem = build_hamiltonian()
    from qiskit_nature.second_q.mappers import JordanWignerMapper

    mapper = JordanWignerMapper()
    hamiltonian = problem.second_q_ops()[0]
    qubit_op = mapper.map(hamiltonian)

    ansatz = build_ansatz(problem.num_spatial_orbitals, problem.num_particles, mapper)

    assert ansatz is not None
