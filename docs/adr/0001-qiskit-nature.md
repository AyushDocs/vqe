# ADR-0001: Use Qiskit Nature for Molecular Hamiltonian

**Status**: Accepted

**Date**: 2024-01-01

## Context

We need to construct the molecular Hamiltonian for H₂ in a form suitable for VQE optimization. Multiple quantum chemistry libraries exist (PySCF, Psi4, Qiskit Nature).

## Decision

Use **Qiskit Nature** for molecular Hamiltonian construction.

## Reasons

1. **Integration**: Native Qiskit integration for VQE
2. **Abstraction**: High-level API for electronic structure calculations
3. **Qubit Mapping**: Built-in support for Jordan-Wigner, Bravyi-Kitaev
4. **Active Development**: IBM-backed, regular updates
5. **Documentation**: Extensive tutorials and examples

## Alternatives Considered

- **PySCF**: More flexible but requires manual qubit mapping
- **Psi4**: Excellent chemistry but interface complexity
- **Custom**: Too much effort for initial release

## Consequences

### Positive
- Seamless VQE integration
- Consistent API across components
- Good community support

### Negative
- Dependency on IBM ecosystem
- Larger installation footprint
- Less control over chemistry defaults

## Notes

Re-evaluate if Qiskit Nature API changes significantly.
