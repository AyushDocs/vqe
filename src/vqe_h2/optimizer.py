"""VQE optimization routines."""

from qiskit.algorithms.minimum_eigensolvers import VQE
from qiskit.algorithms.optimizers import COBYLA
from qiskit_aer import AerSimulator


def run_vqe(qubit_op, ansatz, maxiter: int = 500):
    """Run VQE optimization.

    Args:
        qubit_op: Qubit operator Hamiltonian
        ansatz: Variational ansatz circuit
        maxiter: Maximum optimizer iterations

    Returns:
        VQE result object
    """
    optimizer = COBYLA(maxiter=maxiter)
    backend = AerSimulator()

    vqe = VQE(ansatz, optimizer, backend=backend)
    result = vqe.compute_minimum_eigenvalue(qubit_op)

    return result
