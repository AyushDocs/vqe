'use client'

interface ParametersProps {
  bondDistance: number
  maxIterations: number
  optimizer: string
  onBondDistanceChange: (value: number) => void
  onIterationsChange: (value: number) => void
  onOptimizerChange: (value: string) => void
}

const optimizers = [
  { id: 'cobyla', name: 'COBYLA', description: 'Derivative-free, good for noisy' },
  { id: 'spsa', name: 'SPSA', description: 'Stochastic, hardware-friendly' },
  { id: 'lbfgsb', name: 'L-BFGS-B', description: 'Gradient-based, fast' }
]

export default function ParametersPanel({
  bondDistance,
  maxIterations,
  optimizer,
  onBondDistanceChange,
  onIterationsChange,
  onOptimizerChange
}: ParametersProps) {
  return (
    <div className="card" style={{ marginTop: '16px' }}>
      <div className="card-header">
        <div className="card-icon" style={{ background: 'var(--gradient-green)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18M3 12h18M8 8l8 8M16 8l-8 8" />
          </svg>
        </div>
        <div>
          <h3 className="card-title">Parameters</h3>
          <p className="card-subtitle">Configure VQE settings</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Bond Distance (Å)</label>
        <input
          type="range"
          className="range-input"
          min="0.4"
          max="2.5"
          step="0.01"
          value={bondDistance}
          onChange={(e) => onBondDistanceChange(parseFloat(e.target.value))}
        />
        <div className="range-value">
          <span>0.4 Å</span>
          <span className="range-current">{bondDistance.toFixed(3)} Å</span>
          <span>2.5 Å</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Max Iterations</label>
        <input
          type="range"
          className="range-input"
          min="10"
          max="500"
          step="10"
          value={maxIterations}
          onChange={(e) => onIterationsChange(parseInt(e.target.value))}
        />
        <div className="range-value">
          <span>10</span>
          <span className="range-current">{maxIterations}</span>
          <span>500</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Optimizer</label>
        <select
          className="form-select"
          value={optimizer}
          onChange={(e) => onOptimizerChange(e.target.value)}
        >
          {optimizers.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name} - {opt.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
