# Implementation Guide: Paper to Code

This guide helps contributors implement algorithms from research papers.

## General Process

1. **Read the paper** and understand the algorithm
2. **Identify key equations** and pseudocode
3. **Create RFC** for significant features
4. **Write unit tests** alongside implementation
5. **Document** in `docs/papers/`
6. **Add to literature review**

## Paper Reading Tips

- Start with abstract and introduction
- Focus on algorithm description and pseudocode
- Note any implementation details in appendices
- Check for referenced code repositories

## Implementation Checklist

- [ ] Algorithm understanding confirmed
- [ ] Mathematical formulation captured
- [ ] RFC created (if significant)
- [ ] Module created in `src/vqe_h2/`
- [ ] Unit tests in `tests/`
- [ ] Example script in `examples/`
- [ ] Documentation in `docs/papers/`
- [ ] Added to `docs/references/literature-review.md`

## Code Organization

```
src/vqe_h2/
├── core.py           # Main API
├── hamiltonian.py    # Molecular Hamiltonian
├── ansatz.py         # UCCSD and variants
├── optimizer.py      # VQE optimizer
├── adapt.py          # ADAPT-VQE (planned)
├── qite.py           # QITE (planned)
└── visualization/
    └── plots.py      # Plotting utilities

tests/
├── test_*.py         # Unit tests
└── conftest.py       # Fixtures

examples/
├── basic_vqe.py      # Basic example
├── h2_energy_scan.py # PES scan
├── lih_molecule.py   # LiH example
└── noise_mitigation.py
```

## Testing Standards

- Test each component in isolation
- Mock quantum backend for fast tests
- Test against reference data where available
- Include slow tests marked with `@pytest.mark.slow`

## Documentation Standards

Each implemented paper should have:

1. `docs/papers/[paper].md` with:
   - Metadata (authors, year, DOI)
   - Summary
   - Key equations
   - Implementation notes
   - Comparison to our code

2. Update `docs/references/literature-review.md`

3. Add to `docs/references/implementation-notes.md`
