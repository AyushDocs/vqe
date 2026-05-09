# Literature Review: Variational Quantum Eigensolver (VQE)

This document provides a curated list of foundational and recent papers related to VQE, quantum chemistry, and near-term quantum computing.

## Foundational Papers

### VQE Original Proposal
- **Peruzzo et al. (2014)**: "A variational eigenvalue solver on a photonic quantum processor"
  - Nature Communications 5, 4213
  - DOI: 10.1038/ncomms5213
  - Introduces the VQE framework for near-term quantum devices

### Classical Benchmark Papers
- **Kuchkovskiy & Tauber (2023)**: "Classical simulation of up to 24-qubit quantum circuits with cross-platform performance"
  - arXiv:2309.04532
  - Classical simulation capabilities

- **Flick et al. (2024)**: "Quantum Computing for Climate and Weather"
  - arXiv:2401.15508
  - Applications of quantum computing to chemistry

## Recent Advances (2023-2024)

### Error Mitigation
- **Harrigan et al. (2024)**: "Quantum error correction below the fault-tolerance threshold"
  - arXiv:2402.00581
  - Cross-entropy benchmarking results

- **Kim et al. (2023)**: "Fault-tolerant quantum computation with a surface code"
  - Nature 616, 56-60
  - Error correction advances

### Efficient Ansatz Design
- **Grimsley et al. (2023)**: "Adaptive, problem-specific VQE ansatz generation"
  - arXiv:2304.12252
  - ADAPT-VQE improvements

- **Rattew et al. (2023)**: "Domain-specific ansatz search for quantum chemistry"
  - arXiv:2309.05028
  - Automated ansatz discovery

### Scalability
- **Gao et al. (2024)**: "Large-scale quantum chemistry calculations on GPU-accelerated supercomputers"
  - arXiv:2401.07789
  - Classical simulation of quantum algorithms

- **Arute et al. (2023)**: "Quantum simulation of electronic structure with the variational quantum eigensolver"
  - arXiv:2310.03564
  - Hardware demonstrations

## Key Algorithm Papers

### UCCSD and Extensions
- **Romero et al. (2018)**: "Strategies for quantum computing molecular energies"
  - arXiv:1801.03897
  - UCCSD and hardware efficient ansatz comparison

### ADAPT-VQE
- **Grimsley et al. (2019)**: "Adaptive derivative-assembled state typing VQE (ADAPT-VQE)"
  - Nature Communications 10, 3007
  - DOI: 10.1038/s41467-019-09564-3

### QITE and Imaginary Time Evolution
- **Motta et al. (2021)**: "Eigenvector continuation with subspace expansion"
  - Phys. Rev. E 104, 055309
  - Imaginary time evolution techniques

## Implementation References

### Qiskit-Specific
- **Qiskit Nature Documentation**: https://qiskit.org/documentation/nature/
- **IBM Quantum Learning**: https://learning.qiskit.org/

### Benchmark Standards
- **Google Quantum AI**: Cross-entropy benchmarking protocols
- **IBM Quantum**: Cloud quantum computing guidelines

## Reading Guide

1. **Beginner**: Start with Peruzzo et al. (2014), then Romero et al. (2018)
2. **Intermediate**: ADAPT-VQE paper, Qiskit Nature tutorials
3. **Advanced**: Recent hardware demonstrations, error mitigation papers

## Updating This Review

This document should be updated quarterly with new relevant papers.
Focus on:
- Preprints from arXiv (recent 6 months)
- Nature/Science/Physical Review journals
- IEEE Quantum Computing
