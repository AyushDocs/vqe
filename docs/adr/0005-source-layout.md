# ADR-0005: Source-Based Package Structure

**Status**: Accepted

**Date**: 2024-01-01

## Context

We need to structure the Python package for maintainability, testability, and distribution.

## Decision

Use a **src-layout** structure with `src/vqe_h2/` as the package root.

## Structure

```
vqe_h2/
├── src/
│   └── vqe_h2/
│       ├── __init__.py
│       ├── core.py
│       ├── ansatz.py
│       ├── hamiltonian.py
│       └── optimizer.py
├── tests/
│   ├── conftest.py
│   └── test_*.py
├── docs/
├── examples/
└── notebooks/
```

## Reasons

1. **Import Isolation**: Prevents accidental package imports during development
2. **Testability**: Easy to test against installed version or source
3. **PyPA Recommendation**: Follows Python Packaging Authority best practices
4. **Explicit Dependencies**: Clear separation between src and tests

## Alternatives Considered

- **Flat Layout**: Simpler but risks import issues
- **Plugin Architecture**: Over-engineered for v1.0

## Consequences

### Positive
- Clean import paths
- Proper test isolation
- Easier to add plugins later

### Negative
- Slightly more complex setup
- Requires `pip install -e .` for development

## Notes

Consider plugin architecture in v2.1.0 if demand exists.
