Tutorials
==========

This section contains step-by-step tutorials for using VQE H₂.

.. toctree::
   :maxdepth: 2

   notebooks/getting-started

Getting Started
---------------

This tutorial walks you through running your first VQE calculation.

1. **Install dependencies**

   .. code-block:: bash

      pip install -r requirements.txt

2. **Open the notebook**

   .. code-block:: bash

      jupyter notebook vqe_h2_hydrogen.ipynb

3. **Run cells sequentially**

   Follow the inline instructions in each cell.

Understanding the Ansatz
------------------------

The UCCSD ansatz is based on unitary coupled cluster theory, which provides
an efficient representation of electron correlation in molecules.

Optimizer Comparison
--------------------

Compare different optimizers for VQE:

- **COBYLA**: Derivative-free, good for noisy problems
- **SPSA**: Stochastic, suitable for hardware execution
- **L-BFGS-B**: Gradient-based, faster convergence
