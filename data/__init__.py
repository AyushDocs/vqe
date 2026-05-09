"""Data package for VQE H2."""

from .reference_data import (
    ReferenceData,
    EnergyDataPoint,
    load_reference_data,
    validate_vqe_result,
)

__all__ = [
    "ReferenceData",
    "EnergyDataPoint",
    "load_reference_data",
    "validate_vqe_result",
]
