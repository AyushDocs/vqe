# Research Papers Integration

This section documents how key research papers are integrated into the VQE H₂ project.

## Architecture Overview

```
docs/papers/
├── README.md              # This file
├── peruzzo2014.md         # VQE original paper
├── romero2018.md          # UCCSD implementation
├── adapt-vqe2019.md       # ADAPT-VQE
├── endo2020.md            # Error mitigation
└── papers/
    ├── Peruzzo_VQE_2014.pdf
    ├── Grimsley_ADAPT_2019.pdf
    └── ...
```

## Paper Integration Levels

| Level | Description | Papers |
|-------|-------------|--------|
| **Implemented** | Code exists in repo | UCCSD, basic VQE |
| **Referenced** | Algorithm known, not implemented | ADAPT-VQE |
| **Planned** | Algorithm identified for future | QITE, VQD |

## Implementation Checklist

For each paper:

- [ ] Read and summarize paper
- [ ] Identify key algorithms/methods
- [ ] Map to existing code or plan implementation
- [ ] Create RFC if major feature
- [ ] Add to `docs/references/literature-review.md`
- [ ] Add test case
- [ ] Document in implementation notes
