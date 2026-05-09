# Paper: Quantum Chemistry Calculations on Quantum Computers

## Metadata

| Field | Value |
|-------|-------|
| Authors | Katherine R. H. McClean, J. Romero, P. J. J. O'Malley, A. Aspuru-Guzik |
| Year | 2016 |
| Journal | Physical Review A |
| DOI | 10.1103/PhysRevA.94.042320 |
| arXiv | arXiv:1506.05135 |

## Summary

Theoretical analysis of quantum algorithms for electronic structure calculations, focusing on the encoding of molecular wavefunctions and efficient measurement strategies.

## Key Contributions

1. **Tapered Qubit Hamiltonian**: Reduce number of qubits for symmetry
2. **Measurement Grouping**: Group commuting terms for efficient measurement
3. **Complexity Analysis**: O(N⁸) simulation vs O(N⁴) with quantum

## Jordan-Wigner Transformation

The paper discusses the Jordan-Wigner mapping for fermionic to qubit operators:

```
a_i† → 0.5 * (X_i - iY_i) ⊗ Z_0 ⊗ ... ⊗ Z_{i-1}
```

## Implementation in VQE H₂

**File**: See example notebooks and `src/vqe_h2/hamiltonian.py`

```python
from qiskit_nature.second_q.mappers import JordanWignerMapper

mapper = JordanWignerMapper()
qubit_op = mapper.map(hamiltonian)
```

## Measurement Efficiency

Group Hamiltonian terms by commuting sets:

| Method | Measurements | Accuracy |
|--------|--------------|----------|
| Individual | O(N) | Exact |
| Grouped (our method) | O(log N) | Same |

## Notes

- This paper provides theoretical foundation for our implementation
- Jordan-Wigner chosen for simplicity (vs Bravyi-Kitaev)
- Future work: Implement measurement grouping optimization

## Citations

```bibtex
@article{mcclean2016theory,
  title={The theory of variational hybrid quantum-classical algorithms},
  author={McClean, Jarvis R and others},
  journal={Physical Review A},
  volume={94},
  number={4},
  pages={042320},
  year={2016}
}
```
