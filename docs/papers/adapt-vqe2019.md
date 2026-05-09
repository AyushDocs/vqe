# Paper: ADAPT-VQE: An Adaptive Method for Calculating the Quantum Energy

## Metadata

| Field | Value |
|-------|-------|
| Authors | Harper R. Grimsley, Sophia E. Economou, Edwin Barnes, Nicholas J. Mayhall |
| Year | 2019 |
| Journal | Nature Communications |
| DOI | 10.1038/s41467-019-09564-3 |
| arXiv | arXiv:1812.11173 |

## Summary

ADAPT-VQE introduces an iterative ansatz construction method that builds quantum circuits adaptively based on gradient information, improving both accuracy and efficiency over fixed-depth ansatzes.

## Key Contributions

1. **Operator Pool**: Pre-defined set of excitation operators
2. **Gradient-Based Selection**: Choose operators with largest gradient
3. **Convergence Criteria**: Continue until gradient below threshold

## Algorithm

```
1. Initialize with reference state |ψ₀⟩
2. Build operator pool {O₁, O₂, ..., Oₙ}
3. While ||∇E|| > threshold:
   a. Compute gradient for all operators
   b. Select operator with largest gradient
   c. Add to ansatz with new parameter
   d. Optimize all parameters
```

## Implementation Plan

**Target**: v1.2.0

**Files**: `src/vqe_h2/adapt.py`

```python
from vqe_h2.adapt import ADAPTVQE, OperatorPool

pool = OperatorPool(operator_type='UCCSD')
adapt = ADAPTVQE(operator_pool=pool, threshold=1e-6)
result = adapt.compute_minimum_eigenvalue(qubit_op)
```

## Comparison with UCCSD

| Feature | UCCSD | ADAPT-VQE |
|---------|-------|-----------|
| Circuit Depth | Fixed | Adaptive |
| Parameter Count | O(N⁴) | Variable |
| Convergence | May converge to wrong minimum | Better for strongly correlated |
| Computational Cost | Higher upfront | Iterative |

## When to Use ADAPT-VQE

- Strongly correlated molecules
- Systems where UCCSD fails to converge
- When higher accuracy is required
- When circuit depth is not limited

## RFC

See `docs/rfcs/0001-adapt-vqe.md` for implementation details.

## Citations

```bibtex
@article{grimsley2019adapt,
  title={An adaptive variational algorithm for exact molecular simulations on a quantum computer},
  author={Grimsley, Harper R and others},
  journal={Nature Communications},
  volume={10},
  number={1},
  pages={3007},
  year={2019}
}
```
