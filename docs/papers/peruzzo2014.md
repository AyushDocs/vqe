# Paper: A Variational Eigenvalue Solver on a Photonic Quantum Processor

## Metadata

| Field | Value |
|-------|-------|
| Authors | Alberto Peruzzo, Jarrod McClean, Peter Shadbolt, Man-Hong Yung, James Zhou, Peter Love, Alán Aspuru-Guzik, Jeremy O'Brien |
| Year | 2014 |
| Journal | Nature Communications |
| DOI | 10.1038/ncomms5213 |
| arXiv | arXiv:1304.3061 |

## Summary

Original paper introducing VQE as a hybrid quantum-classical algorithm for finding ground state energies of molecular Hamiltonians on near-term quantum devices.

## Key Contributions

1. **Hybrid Architecture**: Combines quantum processor for expectation value estimation with classical optimizer for parameter updates

2. **Variational Principle**: Uses Rayleigh-Ritz variational method with parameterized quantum state

3. **Photonic Implementation**: Demonstrated on photonic quantum processor

## Mathematical Framework

The VQE algorithm minimizes:

```
E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩ / ⟨ψ(θ)|ψ(θ)⟩
```

Where:
- `ψ(θ)` = Parametrized quantum state (ansatz)
- `H` = Molecular Hamiltonian
- `θ` = Variational parameters

## Implementation in VQE H₂

**File**: `src/vqe_h2/optimizer.py`

```python
def run_vqe(qubit_op, ansatz, maxiter=500):
    # Implements the variational principle
    optimizer = COBYLA(maxiter=maxiter)
    vqe = VQE(ansatz, optimizer, backend=AerSimulator())
    result = vqe.compute_minimum_eigenvalue(qubit_op)
    return result
```

## Key Parameters

| Parameter | Paper Value | Our Implementation |
|-----------|-------------|-------------------|
| Ansatz | Hardware Efficient | UCCSD |
| Optimizer | Nelder-Mead | COBYLA |
| Iterations | 50-100 | Up to 500 |

## Notes

- The paper uses a "variational eigensolver" approach that became foundational for the field
- Demonstrated energy of H₂ close to chemical accuracy
- Set stage for ADAPT-VQE and other improvements

## Citations

```bibtex
@article{peruzzo2014variational,
  title={A variational eigenvalue solver on a photonic quantum processor},
  author={Peruzzo, Alberto and others},
  journal={Nature Communications},
  volume={5},
  pages={4213},
  year={2014}
}
```
