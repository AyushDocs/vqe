"""Hamiltonian construction utilities."""

from qiskit_nature.second_q.drivers import ElectronicStructureMoleculeDriver, Molecule


def build_hamiltonian(bond_distance: float = 0.735, basis: str = "sto3g"):
    """Build H2 molecular Hamiltonian.

    Args:
        bond_distance: H-H bond length in Angstroms
        basis: Basis set name

    Returns:
        QubitOperator for the molecular Hamiltonian
    """
    molecule = Molecule(
        geometry=[["H", [0.0, 0.0, 0.0]], ["H", [bond_distance, 0.0, 0.0]]],
        charge=0,
        multiplicity=1,
    )

    driver = ElectronicStructureMoleculeDriver(
        molecule=molecule,
        basis=basis,
        method="HF",
    )

    problem = driver.run()
    return problem
