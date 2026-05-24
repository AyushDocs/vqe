# VQE for Molecular Ground State Energy Estimation

<div align="center">

![Frontend](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge)
![Quantum Computing](https://img.shields.io/badge/Quantum-VQE-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-green?style=for-the-badge)
![Qiskit](https://img.shields.io/badge/Qiskit-Nature-purple?style=for-the-badge)

*Interactive quantum chemistry simulation — run VQE calculations from your browser.*

</div>

---

## Try It Now

**Live Demo**: [https://vqe-demo.vercel.app](https://vqe-demo.vercel.app)

Run quantum chemistry simulations directly in your browser. No installation required.

---

## Quick Start

### Option 1: Use the Web App (Recommended)

1. Visit [https://vqe-demo.vercel.app](https://vqe-demo.vercel.app)
2. Select a molecule (H₂, LiH, etc.)
3. Adjust parameters (bond distance, basis set)
4. Click "Run VQE" and see results

### Option 2: Run Locally

```bash
# Clone the project
git clone https://github.com/yourusername/vqe.git
cd vqe

# Frontend (Next.js)
cd frontend
npm install
npm run dev

# Backend (Python)
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python examples/basic_vqe.py
```

### Option 3: Interactive Notebooks

```bash
pip install -r requirements.txt
jupyter notebook notebooks/
```

| Notebook | What It Shows |
|----------|---------------|
| `vqe_h2_hydrogen.ipynb` | Basic VQE calculation with plots |
| `adapt_vqe.ipynb` | Advanced adaptive algorithm |
| `dissociation_curve.ipynb` | How energy changes as atoms separate |

---

## Features

### Web Interface
- **Molecule Selection** — H₂, LiH, BeH₂, H₂O, H₄
- **Bond Distance Scan** — Generate potential energy surfaces
- **Real-time Visualization** — Energy convergence plots, circuit diagrams
- **Hardware Access** — Run on IBM Quantum processors (free tier)

### Backend API
- REST API for VQE calculations
- Pre-built molecule configurations
- Reference data validation
- Multiple ansatz options (UCCSD, ADAPT-VQE)

---

## Project Structure

```
vqe/
├── frontend/            # Next.js web app
│   ├── src/app/        # Pages and components
│   └── package.json
├── src/vqe_h2/         # Python package
│   ├── core.py
│   ├── hamiltonian.py
│   ├── ansatz.py
│   └── optimizer.py
├── examples/            # Python scripts
├── notebooks/           # Jupyter notebooks
├── configs/            # Molecule definitions
└── docs/               # Documentation
```

---

## The Science

VQE (Variational Quantum Eigensolver) finds the ground state energy of molecules:

1. **Start with a guess** → Quantum state representing the molecule
2. **Measure the energy** → Use quantum hardware/simulator
3. **Improve the guess** → Classical optimizer adjusts parameters
4. **Repeat** → Until we find the minimum energy

| Application | Impact |
|-------------|--------|
| Drug Discovery | Simulate protein-drug interactions |
| Climate Tech | Design carbon capture materials |
| Batteries | Create better energy storage |

---

## Contributing

See `docs/CONTRIBUTING.md` for guidelines.

---

## License

MIT License - free to use, modify, and share.

---

<div align="center">

**Built with [Qiskit](https://qiskit.org) + [Next.js](https://nextjs.org)**

</div>
