Performance and Benchmarking
============================

This section documents performance benchmarks and optimization strategies for VQE H₂.

Running Benchmarks
------------------

Run all benchmarks:

.. code-block:: bash

   python benchmarks/benchmark_vqe.py

Run pytest benchmarks with timing:

.. code-block:: bash

   pytest benchmarks/ --benchmark-json=benchmark.json

Performance Targets
------------------

| Operation | Target | Current |
|-----------|-------|---------|
| Hamiltonian build | <100ms | ~80ms |
| Ansatz construction | <500ms | ~400ms |
| VQE (50 iterations) | <60s | ~45s |
| VQE (200 iterations) | <180s | ~150s |

Benchmark Results Format
-------------------------

Results are stored in JSON format:

.. code-block:: json

   {
       "timestamp": "2024-01-01T00:00:00Z",
       "version": "1.0.0",
       "benchmarks": [
           {"operation": "hamiltonian_build", "time_ms": 80.5},
           {"operation": "ansatz_build", "time_ms": 420.3},
           {"operation": "vqe_execution", "time_s": 45.2, "iterations": 50}
       ]
   }

Tracking Changes
----------------

Benchmark history is tracked in GitHub Pages. Significant regressions (>50%) will trigger alerts.
