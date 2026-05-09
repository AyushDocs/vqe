# ADR-0002: UCCSD as Default Ansatz

**Status**: Accepted

**Date**: 2024-01-01

## Context

The variational ansatz is crucial for VQE convergence and expressibility. We need a balance between accuracy and circuit depth.

## Decision

Use **Unitary Coupled Cluster Singles and Doubles (UCCSD)** as the default ansatz.

## Reasons

1. **Chemical Accuracy**: Well-established for molecular systems
2. **Physical Basis**: Based on coupled cluster theory
3. **Available in Qiskit**: Native implementation in qiskit-nature
4. **Reasonable Depth**: Tractable for H₂ (4 qubits)

## Alternatives Considered

- **Hardware Efficient Ansatz (HEA)**: Less chemically motivated, risk of barren plateaus
- **k-UpDown GADGETS**: Good for strongly correlated systems but more complex
- **ADAPT-VQE**: More chemically accurate but requires iterative optimization

## Consequences

### Positive
- Chemically motivated and interpretable
- Good convergence for weakly correlated systems
- Easy to initialize with Hartree-Fock state

### Negative
- May struggle with strongly correlated systems
- Exponential scaling with excitations
- Not optimal for near-term devices

## Notes

Consider ADAPT-VQE for v1.2.0 if strongly correlated systems become a priority.
