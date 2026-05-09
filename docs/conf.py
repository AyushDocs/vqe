# Sphinx documentation configuration
import os
import sys

sys.path.insert(0, os.path.abspath("../src"))

project = "VQE H2"
copyright = "2024, VQE H2 Contributors"
author = "VQE H2 Contributors"

extensions = [
    "sphinx.ext.napoleon",
    "myst_parser",
]

source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_theme = "alabaster"
html_static_path = ["_static"]
