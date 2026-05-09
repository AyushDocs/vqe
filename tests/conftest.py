"""Pytest configuration and fixtures."""

import pytest
import sys
from pathlib import Path

src_path = Path(__file__).parent.parent / "src"
sys.path.insert(0, str(src_path))


@pytest.fixture
def h2_molecule_params():
    """Fixture for H2 molecule parameters at equilibrium."""
    return {
        "bond_distance": 0.735,
        "basis": "sto3g",
        "charge": 0,
        "multiplicity": 1,
    }


@pytest.fixture
def molecule_geometry():
    """Fixture for H2 molecule geometry."""
    return [
        ["H", [0.0, 0.0, 0.0]],
        ["H", [0.735, 0.0, 0.0]],
    ]


@pytest.fixture
def expected_energy_range():
    """Expected ground state energy range for H2 in Hartree."""
    return {"min": -1.15, "max": -1.0}


@pytest.fixture(autouse=True)
def add_src_to_path():
    """Automatically add src to path for all tests."""

    yield
