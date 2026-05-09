# ADR-0007: Sphinx for Documentation

**Status**: Accepted

**Date**: 2024-01-01

## Context

We need a documentation system that supports API reference, tutorials, and project documentation.

## Decision

Use **Sphinx** with the **sphinx-rtd-theme** for documentation.

## Reasons

1. **API Documentation**: Excellent autodoc support for Python
2. **ReStructuredText**: Clear markup language
3. **Read the Docs**: Free hosting with version control
4. **Jupyter Integration**: nbconvert for notebooks
5. **Search**: Built-in full-text search

## Structure

```
docs/
├── conf.py           # Sphinx configuration
├── index.rst         # Main documentation page
├── installation.md   # Installation guide
├── api/
│   └── reference.rst # API reference
└── _build/           # Generated HTML
```

## Consequences

### Positive
- Professional documentation appearance
- Versioned documentation
- CI/CD integration with GitHub Actions

### Negative
- ReStructuredText learning curve
- Build step required

## Notes

Could switch to MkDocs in future if Markdown is preferred.
