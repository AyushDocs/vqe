# RFC: ADAPT-VQE Implementation

**Status**: Draft

**Author**: VQE H2 Contributors

**Created**: 2024-01-15

---

## Summary

Implement ADAPT-VQE (Adaptive Derivative-Assembled State Typing VQE) for improved convergence and chemically motivated ansatz construction.

## Motivation

1. **Chemical Accuracy**: ADAPT-VQE builds ansatz specifically for the target molecule
2. **Reduced Circuit Depth**: Only includes necessary operators
3. **Better Convergence**: Gradient-based operator selection
4. **Research Demand**: Frequently requested by users studying strongly correlated systems

## Detailed Design

### Implementation Plan

1. Create `OperatorPool` class
   - Define single and double excitation operators
   - Support custom operator pools

2. Create `ADAPTVQE` class
   - Extend base VQE interface
   - Implement gradient computation
   - Operator selection loop

3. Integration
   - Integrate with existing `src/vqe_h2/ansatz.py`
   - Add configuration options

### API Changes

```python
from vqe_h2.adapt import ADAPTVQE, OperatorPool

pool = OperatorPool(operator_type='UCCSD')
adapt_vqe = ADAPTVQE(operator_pool=pool, threshold=1e-6)
result = adapt_vqe.compute_minimum_eigenvalue(qubit_op)
```

### Migration Plan

- Add new module `src/vqe_h2/adapt.py`
- Existing VQE usage unchanged
- Optional flag for ADAPT-VQE in examples

## Alternatives Considered

1. **qiskit-nature ADAPT-VQE**: Use built-in implementation
   - Pros: Less code to maintain
   - Cons: Less customization

2. **HEA with larger depth**: Alternative ansatz
   - Pros: Simpler implementation
   - Cons: Less chemically motivated

## References

- Grimsley et al. (2019). ADAPT-VQE. Nature Communications.
- DOI: 10.1038/s41467-019-09564-3

## Change Log

| Date | Change |
|------|--------|
| 2024-01-15 | Initial draft |
