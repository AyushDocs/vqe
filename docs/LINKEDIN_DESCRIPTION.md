# VQE Hydrogen Molecule Simulation

A hands-on implementation of the Variational Quantum Eigensolver (VQE) algorithm for quantum chemistry simulation — specifically calculating the ground state energy of the hydrogen molecule (H₂).

![VQE Overview](https://img.shields.io/badge/Quantum-VQE-blue)
![Qiskit](https://img.shields.io/badge/Qiskit-1.0-green)
![Python](https://img.shields.io/badge/Python-3.9+-yellow)

## What is VQE?

VQE is a **hybrid quantum-classical algorithm** that finds the lowest energy state (ground state) of a molecule. It's like teaching a quantum computer to understand how atoms bond together.

### Why It Matters

- **Drug Discovery**: Understanding molecular interactions
- **Materials Science**: Designing new materials
- **Catalysis**: Optimizing chemical reactions
- **Climate**: Developing carbon capture materials

## Quick Start

```bash
# Clone and setup
git clone https://github.com/yourusername/vqe_h2.git
cd vqe_h2
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run the basic example
python examples/basic_vqe.py

# Or open in Jupyter
jupyter notebook vqe_h2_hydrogen.ipynb
```

## What This Project Does

### 1. Standard VQE (UCCSD Ansatz)
Uses the Unitary Coupled-Cluster with Singles and Doubles (UCCSD) ansatz — a wavefunction approximation that mimics electron excitations in molecules.

### 2. ADAPT-VQE
An adaptive version that builds the quantum circuit step-by-step, adding only the most impactful operations. This often results in:
- Fewer quantum gates (simpler circuits)
- Better convergence
- More accurate results

### 3. Dissociation Curves
Shows how molecular energy changes as atoms move apart — crucial for understanding chemical bonds.

## Project Structure

```
vqe_h2/
├── examples/           # Ready-to-run Python scripts
├── notebooks/          # Jupyter notebooks with step-by-step guides
├── src/vqe_h2/        # Core algorithm implementations
│   ├── core.py         # Main VQE functions
│   ├── ansatz.py       # Quantum circuit construction
│   ├── hamiltonian.py  # Molecular energy calculations
│   └── optimizer.py    # Classical optimization
├── configs/           # Molecule configurations
└── data/              # Reference data for validation
```

## Key Outputs

The project generates visualizations showing:

| Output | Description |
|--------|-------------|
| `ansatz_circuit.png` | Quantum circuit diagram |
| `energy_convergence.png` | How the algorithm finds the minimum energy |
| `adapt_convergence.png` | ADAPT vs standard VQE comparison |
| `dissociation_curve.png` | Energy vs atom separation |
| `energy_pareto.png` | Trade-off between accuracy and circuit complexity |

## Running on Real Quantum Hardware

1. Get free account at [IBM Quantum](https://quantum.ibm.com)
2. Get your API token
3. Uncomment the hardware code in the notebooks
4. Submit your job to a real quantum computer!

## Learn More

- [Qiskit Documentation](https://qiskit.org/documentation/)
- [VQE Original Paper](https://arxiv.org/abs/1304.3061)
- [ADAPT-VQE Paper](https://arxiv.org/abs/1812.11173)

## Requirements

- Python 3.9+
- Qiskit Nature
- Qiskit Aer (for simulation)
- NumPy, Matplotlib

## License

MIT
