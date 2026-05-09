# Implementation Notes from Literature

This document maps paper implementations to our codebase.

## VQE Algorithm (Peruzzo et al. 2014)

**Implementation**: `src/vqe_h2/optimizer.py`

- Hybrid quantum-classical optimization ✓
- Variational parameters ✓
- Cost function evaluation on quantum device ✓

## UCCSD Ansatz (Romero et al. 2018)

**Implementation**: `src/vqe_h2/ansatz.py`

- Excitation operators ✓
- Exponential of excitation operators ✓
- Hardware-efficient alternatives available

## ADAPT-VQE (Grimsley et al. 2019)

**Status**: Planned for v1.2.0

**Implementation location**: `src/vqe_h2/adapt.py`

**Key features**:
- Operator pool selection
- Gradient-based ansatz growth
- Convergence improvement

## Qubit Mapping (Jordan-Wigner)

**Implementation**: See example notebooks

- Jordan-Wigner transformation ✓
- Bravyi-Kitaev alternative documented

## Error Mitigation

**Implementation**: `examples/noise_mitigation.py`

- Zero-noise extrapolation (ZNE) ✓
- Circuit repetitions for Mitigated Y (MITY) ✓

## Future Implementations

| Paper | Status | Target Version |
|-------|--------|---------------|
| ADAPT-VQE | Planned | v1.2.0 |
| QITE | Planned | v1.3.0 |
| VQD | Planned | v2.0.0 |
| Imaginary Time Evolution | Research | v2.1.0 |
