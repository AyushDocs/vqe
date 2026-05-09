'use client'

import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
import EnergyChart from '@/components/EnergyChart'

const molecules = [
  { id: 'h2', name: 'Hydrogen (H₂)', electrons: 2, qubits: 4 },
  { id: 'lih', name: 'Lithium Hydride (LiH)', electrons: 4, qubits: 12 },
  { id: 'beh2', name: 'Beryllium Hydride (BeH₂)', electrons: 6, qubits: 14 },
  { id: 'h4', name: 'Hydrogen Chain (H₄)', electrons: 4, qubits: 8 }
]

export default function Simulator() {
  const [molecule, setMolecule] = useState('h2')
  const [bondDistance, setBondDistance] = useState(0.735)
  const [maxIterations, setMaxIterations] = useState(100)
  const [optimizer, setOptimizer] = useState('COBYLA')
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRun = async () => {
    setIsRunning(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/vqe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          molecule,
          bondDistance,
          maxIterations,
          optimizer: optimizer.toLowerCase()
        })
      })

      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()
      setResults(data.data)
    } catch (err) {
      setError('Failed to run VQE calculation. Please try again.')
    } finally {
      setIsRunning(false)
    }
  }

  const selectedMol = molecules.find(m => m.id === molecule)

  return (
    <div style={{ padding: '48px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
          VQE Simulator
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Run quantum chemistry calculations using the Variational Quantum Eigensolver
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 380px) 1fr',
        gap: '24px'
      }}>
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="19" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="card-title">Select Molecule</h3>
                <p className="card-subtitle">Choose a molecule to simulate</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Molecule</label>
              <select
                className="form-select"
                value={molecule}
                onChange={(e) => setMolecule(e.target.value)}
              >
                {molecules.map(mol => (
                  <option key={mol.id} value={mol.id}>{mol.name}</option>
                ))}
              </select>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '16px'
            }}>
              <div className="molecule-detail">
                <p className="detail-label">Electrons</p>
                <p className="detail-value">{selectedMol?.electrons}</p>
              </div>
              <div className="molecule-detail">
                <p className="detail-label">Qubits</p>
                <p className="detail-value">{selectedMol?.qubits}</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '16px' }}>
            <div className="card-header">
              <div className="card-icon" style={{ background: 'var(--gradient-green)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M3 12h18" />
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
                onChange={(e) => setBondDistance(parseFloat(e.target.value))}
              />
              <div className="range-value">
                <span>0.4</span>
                <span className="range-current">{bondDistance.toFixed(3)} Å</span>
                <span>2.5</span>
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
                onChange={(e) => setMaxIterations(parseInt(e.target.value))}
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
                onChange={(e) => setOptimizer(e.target.value)}
              >
                <option value="COBYLA">COBYLA - Derivative-free</option>
                <option value="SPSA">SPSA - Stochastic</option>
                <option value="LBFGSB">L-BFGS-B - Gradient-based</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary btn-full"
            onClick={handleRun}
            disabled={isRunning}
            style={{ marginTop: '16px', padding: '16px', fontSize: '16px' }}
          >
            {isRunning ? (
              <>
                <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Running...
              </>
            ) : (
              <>
                <Play size={20} />
                Run VQE
              </>
            )}
          </button>
        </div>

        <div>
          <div className="results-panel">
            <div className="results-header">
              <span className="results-title">Results</span>
              <div className="results-status">
                {!results && !isRunning && !error && <><div className="status-dot" /> Idle</>}
                {isRunning && <><div className="status-dot running" /> Running</>}
                {results && <><div className="status-dot success" /> Complete</>}
                {error && <><div className="status-dot error" /> Error</>}
              </div>
            </div>

            <div className="results-body">
              {!results && !isRunning && !error && (
                <div className="results-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                  </svg>
                  <p>Click &quot;Run VQE&quot; to calculate ground state energy</p>
                </div>
              )}

              {isRunning && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>Running VQE calculation...</p>
                </div>
              )}

              {error && (
                <div className="error-message">{error}</div>
              )}

              {results && (
                <div>
                  <div className="energy-display">
                    <p className="energy-label">Ground State Energy</p>
                    <p className="energy-value">{results.vqeEnergy.toFixed(6)}</p>
                    <p className="energy-unit">Hartrees (Ha)</p>
                    <div className="energy-comparison">
                      <span>Exact: <strong>{results.exactEnergy.toFixed(6)} Ha</strong></span>
                      <span>Error: <strong>{results.error.toFixed(6)} Ha</strong></span>
                    </div>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-item">
                      <p className="stat-value">{results.iterations}</p>
                      <p className="stat-label">Iterations</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-value">{results.basis}</p>
                      <p className="stat-label">Basis Set</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-value">{results.bondDistance.toFixed(3)}</p>
                      <p className="stat-label">Bond (Å)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {results && (
            <div className="card" style={{ marginTop: '16px' }}>
              <div className="card-header">
                <div className="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9M13 17V5M8 17v-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="card-title">Energy Convergence</h3>
                  <p className="card-subtitle">VQE optimization progress</p>
                </div>
              </div>
              <EnergyChart
                data={results.energyHistory}
                exactEnergy={results.exactEnergy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
