Installation
============

Requirements
------------

- Python 3.9 or higher
- Qiskit Nature
- Qiskit Aer
- NumPy, Matplotlib

Install
-------

.. code-block:: bash

   git clone <repository-url>
   cd vqe_h2
   pip install -r requirements.txt

Verifying Installation
----------------------

.. code-block:: python

   from vqe_h2 import build_hamiltonian, build_ansatz, run_vqe
   print("Installation successful!")
