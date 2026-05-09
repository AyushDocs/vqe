Development Guide
=================

This guide covers how to set up a development environment and contribute to VQE H₂.

.. contents::
   :local:

Development Setup
-----------------

1. **Clone the repository**

   .. code-block:: bash

      git clone https://github.com/your-username/vqe-h2.git
      cd vqe-h2

2. **Create virtual environment**

   .. code-block:: bash

      python3 -m venv venv
      source venv/bin/activate  # Linux/Mac
      venv\Scripts\activate     # Windows

3. **Install dependencies**

   .. code-block:: bash

      pip install -r requirements.txt
      pip install -r requirements-dev.txt

4. **Install pre-commit hooks**

   .. code-block:: bash

      pre-commit install

Running Tests
-------------

Run the full test suite:

.. code-block:: bash

   pytest

Run only fast tests (skip ``@pytest.mark.slow``):

.. code-block:: bash

   pytest -m "not slow"

Run with coverage:

.. code-block:: bash

   pytest --cov=vqe_h2 --cov-report=html

Code Quality
------------

Check code formatting:

.. code-block:: bash

   black src/ tests/
   ruff check src/

Run all quality checks:

.. code-block:: bash

   pre-commit run --all-files

Documentation
-------------

Build documentation locally:

.. code-block:: bash

   cd docs
   sphinx-build -b html . _build

Submitting Changes
------------------

1. Create a feature branch
2. Make your changes
3. Run tests and quality checks
4. Submit a pull request
