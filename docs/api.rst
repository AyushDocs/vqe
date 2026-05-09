API Reference
=============

This section documents the core functions and modules in VQE H₂.

core module
-----------

.. py:function:: build_hamiltonian(driver)

   Build the molecular Hamiltonian from an electronic structure driver.

   :param driver: Electronic structure driver (e.g., PySCFDriver)
   :returns: Mapped qubit operator

.. py:function:: build_ansatz(problem, mapper)

   Build the VQE ansatz circuit.

   :param problem: Electronic structure problem
   :param mapper: Qubit mapper (Jordan-Wigner)
   :returns: Configured ansatz circuit

.. py:function:: run_vqe(qubit_op, ansatz, optimizer, backend)

   Run the VQE algorithm.

   :param qubit_op: Hamiltonian as qubit operator
   :param ansatz: Parameterized quantum circuit
   :param optimizer: Classical optimizer
   :param backend: Quantum simulator or hardware
   :returns: VQE result with optimal parameters

hamiltonian module
------------------

Functions for constructing and manipulating molecular Hamiltonians.

ansatz module
-------------

Quantum circuit constructions for VQE including UCCSD and ADAPT-VQE.

optimizer module
----------------

Classical optimization wrappers for VQE parameter tuning.
