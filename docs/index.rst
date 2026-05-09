VQE H₂ Documentation
====================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   installation
   tutorials
   api
   development
   roadmap
   milestones

Overview
--------

VQE H₂ is a Variational Quantum Eigensolver implementation for computing
the ground state energy of the hydrogen molecule.

Quick Start
~~~~~~~~~~~

.. code-block:: bash

   pip install -r requirements.txt
   jupyter notebook vqe_h2_hydrogen.ipynb

Features
~~~~~~~~

- Ground state energy calculation for H₂
- UCCSD ansatz with Hartree-Fock initial state
- ADAPT-VQE for adaptive circuit construction
- Qiskit Nature integration
- Multiple optimizer support (COBYLA, SPSA, L-BFGS-B)
- Dissociation curve analysis
- Noisy simulation with error models

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
