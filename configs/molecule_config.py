"""Molecule configuration loader using dataclasses."""

import json
from dataclasses import dataclass, asdict, field
from pathlib import Path
from typing import List, Dict, Any, Optional


@dataclass
class Atom:
    """Represents an atom in a molecule."""

    element: str
    coordinates: List[float]

    def to_list(self) -> List[Any]:
        return [self.element, self.coordinates]

    @classmethod
    def from_list(cls, data: List[Any]) -> "Atom":
        return cls(element=data[0], coordinates=data[1])


@dataclass
class MoleculeConfig:
    """Configuration for a molecular system."""

    name: str
    geometry: List[Any]
    charge: int
    multiplicity: int
    basis: str
    method: str
    description: str = ""
    expected_energy: Optional[float] = None
    num_electrons: Optional[int] = None
    num_spin_orbitals: Optional[int] = None
    references: Dict[str, str] = field(default_factory=dict)
    notes: str = ""

    @property
    def atoms(self) -> List[Atom]:
        """Convert geometry to list of Atom objects."""
        return [Atom(element=g[0], coordinates=g[1]) for g in self.geometry]

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "MoleculeConfig":
        """Create from dictionary."""
        return cls(**data)

    @classmethod
    def from_json(cls, filepath: str) -> "MoleculeConfig":
        """Load from JSON file."""
        with open(filepath, "r") as f:
            data = json.load(f)
        return cls.from_dict(data)

    def to_json(self, filepath: str) -> None:
        """Save to JSON file."""
        with open(filepath, "w") as f:
            json.dump(self.to_dict(), f, indent=2)


def load_config(filepath: str) -> MoleculeConfig:
    """Load molecule configuration from JSON file."""
    return MoleculeConfig.from_json(filepath)


def load_all_configs(config_dir: str = None) -> List[MoleculeConfig]:
    """Load all molecule configurations from directory."""
    if config_dir is None:
        config_dir = Path(__file__).parent
    else:
        config_dir = Path(config_dir)

    configs = []
    for filepath in config_dir.glob("*.json"):
        if filepath.name != "__init__.py":
            configs.append(load_config(str(filepath)))
    return configs


def create_h2_equilibrium() -> MoleculeConfig:
    """Create H2 at equilibrium geometry."""
    return MoleculeConfig(
        name="Hydrogen (H2)",
        geometry=[["H", [0.0, 0.0, 0.0]], ["H", [0.735, 0.0, 0.0]]],
        charge=0,
        multiplicity=1,
        basis="sto3g",
        method="HF",
        description="H2 molecule at equilibrium bond distance",
        expected_energy=-1.137,
        num_electrons=2,
        num_spin_orbitals=4,
    )


def create_lih() -> MoleculeConfig:
    """Create LiH molecule configuration."""
    return MoleculeConfig(
        name="Lithium Hydride (LiH)",
        geometry=[["Li", [0.0, 0.0, 0.0]], ["H", [1.6, 0.0, 0.0]]],
        charge=0,
        multiplicity=1,
        basis="sto3g",
        method="HF",
        description="LiH molecule for scalability testing",
        expected_energy=-8.02,
        num_electrons=4,
        num_spin_orbitals=12,
    )
