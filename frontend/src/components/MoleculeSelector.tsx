'use client'

interface Molecule {
  id: string
  name: string
  formula: string
  electrons: number
  qubits: number
  description: string
}

const molecules: Molecule[] = [
  {
    id: 'h2',
    name: 'Hydrogen',
    formula: 'H₂',
    electrons: 2,
    qubits: 4,
    description: 'Simplest neutral molecule, perfect for learning VQE'
  },
  {
    id: 'lih',
    name: 'Lithium Hydride',
    formula: 'LiH',
    electrons: 4,
    qubits: 12,
    description: 'More electrons, tests scalability'
  },
  {
    id: 'beh2',
    name: 'Beryllium Hydride',
    formula: 'BeH₂',
    electrons: 6,
    qubits: 14,
    description: 'Three-atom linear molecule'
  },
  {
    id: 'h4',
    name: 'Hydrogen Chain',
    formula: 'H₄',
    electrons: 4,
    qubits: 8,
    description: 'Linear chain for hardware testing'
  }
]

interface MoleculeSelectorProps {
  selected: string
  onChange: (id: string) => void
}

export default function MoleculeSelector({ selected, onChange }: MoleculeSelectorProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="19" r="2" />
            <line x1="14.5" y1="9.5" x2="17.5" y2="6.5" />
            <line x1="9.5" y1="14.5" x2="6.5" y2="17.5" />
          </svg>
        </div>
        <div>
          <h3 className="card-title">Select Molecule</h3>
          <p className="card-subtitle">Choose a molecule to simulate</p>
        </div>
      </div>

      <div className="form-group">
        <select
          className="form-select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {molecules.map((mol) => (
            <option key={mol.id} value={mol.id}>
              {mol.formula} - {mol.name}
            </option>
          ))}
        </select>
      </div>

      {molecules.map((mol) => (
        <div
          key={mol.id}
          className={`molecule-card ${selected === mol.id ? 'selected' : ''}`}
          onClick={() => onChange(mol.id)}
          style={{
            display: selected === mol.id ? 'block' : 'none',
            padding: '16px',
            marginTop: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer'
          }}
        >
          <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>{mol.formula}</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {mol.description}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Electrons</span>
              <p style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{mol.electrons}</p>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Qubits</span>
              <p style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{mol.qubits}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
