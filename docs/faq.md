Frequently Asked Questions
===========================

General
-------

**What is VQE?**

VQE (Variational Quantum Eigensolver) is a hybrid quantum-classical algorithm used to find the ground state energy of a molecular system. It uses a quantum computer to evaluate the energy expectation value and a classical computer to optimize the variational parameters.

**Why H₂?**

Hydrogen molecule (H₂) is the simplest neutral molecule and serves as an excellent test case for quantum chemistry algorithms. It has just 2 electrons and 4 spin-orbitals, making it tractable on both classical and quantum computers.

**What is UCCSD?**

UCCSD stands for Unitary Coupled Cluster Singles and Doubles. It's a chemically motivated ansatz that includes single and double excitations from a reference state (Hartree-Fock).

**What is Hartree-Fock?**

Hartree-Fock is a mean-field approximation that provides a good starting point for more accurate quantum chemistry calculations. In VQE, it serves as the initial state.

Technical
---------

**Why does the optimizer sometimes fail to converge?**

VQE is a non-convex optimization problem. The COBYLA optimizer used in this project is generally robust, but sometimes:
- The ansatz may be too expressive and find local minima
- The initial parameters may need adjustment
- The maximum iterations may be too low

**How do I choose the right optimizer?**

- **COBYLA**: Derivative-free, good for noisy problems
- **SPSA**: Stochastic, suitable for hardware execution
- **L-BFGS-B**: Gradient-based, faster convergence but sensitive to noise

**What is the expected error?**

With 200+ optimizer iterations, the energy error should be < 0.001 Hartree compared to exact diagonalization.

**Can I run on real quantum hardware?**

Yes. Set the ``IBM_TOKEN`` environment variable and uncomment the hardware execution cells in the notebook.

**How do I cite this work?**

If you use VQE H₂ in your research, please cite:

.. code-block:: text

   VQE H2 Contributors. (2024). VQE for H2 Molecule.
   https://github.com/your-username/vqe-h2
