"""Reference data loader for validation."""

import json
from pathlib import Path
from dataclasses import dataclass
from typing import List, Dict, Any, Optional


@dataclass
class EnergyDataPoint:
    """Single energy data point."""

    bond_distance: float
    energy: float
    source: str


@dataclass
class ReferenceData:
    """Reference data for molecular validation."""

    molecule: str
    basis: str
    method: str
    data: List[EnergyDataPoint]
    metadata: Dict[str, Any]

    @classmethod
    def from_json(cls, filepath: str) -> "ReferenceData":
        """Load from JSON file."""
        with open(filepath, "r") as f:
            raw = json.load(f)

        data = [EnergyDataPoint(**d) for d in raw["data"]]
        return cls(
            molecule=raw["molecule"],
            basis=raw["basis"],
            method=raw["method"],
            data=data,
            metadata=raw.get("metadata", {}),
        )

    def get_energy(self, bond_distance: float) -> Optional[float]:
        """Get reference energy for a given bond distance."""
        for point in self.data:
            if abs(point.bond_distance - bond_distance) < 0.01:
                return point.energy
        return None

    def get_all_bond_distances(self) -> List[float]:
        """Get all available bond distances."""
        return [d.bond_distance for d in self.data]

    def get_all_energies(self) -> List[float]:
        """Get all available energies."""
        return [d.energy for d in self.data]


def load_reference_data(molecule: str) -> Optional[ReferenceData]:
    """Load reference data for a molecule."""
    data_dir = Path(__file__).parent
    filepath = data_dir / f"{molecule.lower()}_reference.json"

    if filepath.exists():
        return ReferenceData.from_json(str(filepath))
    return None


def validate_vqe_result(energy: float, reference: ReferenceData, tolerance: float = 0.01) -> bool:
    """Validate VQE result against reference data.

    Args:
        energy: Computed VQE energy
        reference: Reference data
        tolerance: Acceptable error in Hartree

    Returns:
        True if result is within tolerance
    """
    for point in reference.data:
        if abs(energy - point.energy) < tolerance:
            return True
    return False
