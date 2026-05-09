# Paper: Strategies for Quantum Computing Molecular Energies

## Metadata

| Field | Value |
|-------|-------|
| Authors | Jarrod McClean, Jonathan Romero, Ryan Babbush, Alán Aspuru-Guzik |
| Year | 2018 |
| Journal | - |
| arXiv | arXiv:1801.03897 |

## Summary

Comprehensive review of strategies for computing molecular energies on quantum computers, with emphasis on the Variational Quantum Eigensolver (VQE) and Unitary Coupled Cluster (UCC) ansatz.

## Key Contributions

1. **Ansatz Comparison**: Hardware Efficient vs Chemical Ansatz
2. **Gate Efficiency**: Optimizing circuit depth for near-term devices
3. **Measurement Strategies**: Grouping Hamiltonians for efficient measurement

## UCCSD Implementation

The paper provides detailed implementation of UCCSD:

```python
# Unitary Coupled Cluster Singles and Doubles
U(θ) = exp(T(θ) - T†(θ))

# T = T₁ + T₂
# T₁ = Σ_{ia} θ_i^a a_a† a_i      (singles)
# T₂ = Σ_{ijab} θ_ij^{ab} a_a† a_b† a_j a_i  (doubles)
```

## Implementation in VQE H₂

**File**: `src/vqe_h2/ansatz.py`

```python
from qiskit_nature.second_q.circuit.library import UCCSD

ansatz = UCCSD(
    num_spatial_orbitals=num_spatial_orbitals,
    num_particles=num_particles,
    mapper=mapper,
    initial_state=initial_state,
)
```

## Key Findings

1. **UCCSD Accuracy**: Near exact results for weakly correlated systems
2. **Hardware Efficient**: Better for strongly correlated but less accurate
3. **STO-3G Basis**: Optimal for near-term due to qubit efficiency

## Recommendations from Paper

| System Type | Recommended Ansatz |
|-------------|-------------------|
| H₂, H₂O | UCCSD |
| Strongly Correlated | ADAPT-VQE |
| Large Systems | Hardware Efficient |

## Notes

- This paper is the primary reference for our implementation
- STO-3G basis chosen based on recommendations
- UCCSD chosen for chemical accuracy

## Citations

```bibtex
@article{romero2018strategies,
  title={Strategies for quantum computing molecular energies using the variational quantum eigensolver},
  author={Romero, Jonathan and others},
  journal={International Journal of Quantum Chemistry},
  year={2018},
  note={arXiv:1801.03897}
}
```
