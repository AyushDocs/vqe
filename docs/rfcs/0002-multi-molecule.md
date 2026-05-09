# RFC: Multi-Molecule Support

**Status**: Draft

**Author**: VQE H2 Contributors

**Created**: 2024-01-20

---

## Summary

Extend VQE H₂ to support multiple molecules (LiH, H₂O, BeH₂, etc.) with a unified configuration system.

## Motivation

1. **Scalability Testing**: Larger molecules test algorithm scalability
2. **Research Applications**: Different molecules for different use cases
3. **User Demand**: Request for LiH, H₂O support

## Detailed Design

### Configuration System

```python
from vqe_h2.configs import MoleculeConfig, load_config

config = load_config("configs/lih.json")
molecule = config.to_qiskit_molecule()
```

### New Molecules

| Molecule | Qubits | Electrons | Priority |
|----------|--------|-----------|----------|
| H₂ | 4 | 2 | Done |
| LiH | 12 | 4 | v1.2.0 |
| BeH₂ | 14 | 6 | v1.2.0 |
| H₂O | 14 | 10 | v1.3.0 |
| CH₄ | 20 | 10 | v2.0.0 |

### API Changes

```python
from vqe_h2.core import build_problem

problem = build_problem(molecule_config)
ansatz = build_ansatz(problem.num_spatial_orbitals, ...)
```

## References

- Cao et al. (2019). Quantum Chemistry in the Age of Quantum Computing.
- DOI: 10.1021/acs.chemrev.8b00652
