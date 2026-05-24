'use client'

import { useState } from 'react'
import { Play, Loader2, BookOpen, Atom, GitBranch, Zap, Activity } from 'lucide-react'
import EnergyChart from '@/components/EnergyChart'
import DissociationChart from '@/components/DissociationChart'
import ExcitedStateDiagram from '@/components/ExcitedStateDiagram'

const molecules = [
  { id: 'h2', name: 'Hydrogen (H₂)', electrons: 2, qubits: 4 },
  { id: 'lih', name: 'Lithium Hydride (LiH)', electrons: 4, qubits: 12 },
  { id: 'beh2', name: 'Beryllium Hydride (BeH₂)', electrons: 6, qubits: 14 },
  { id: 'h4', name: 'Hydrogen Chain (H₄)', electrons: 4, qubits: 8 }
]

const notebookLinks: Record<string, string> = {
  h2: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/vqe_h2_hydrogen.ipynb',
  lih: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/lih_dissociation.ipynb',
  beh2: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/dissociation_curve.ipynb',
  h4: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/adapt_vqe.ipynb'
}

const allNotebooks = [
  { name: 'VQE for H₂', url: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/vqe_h2_hydrogen.ipynb' },
  { name: 'ADAPT-VQE', url: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/adapt_vqe.ipynb' },
  { name: 'Dissociation Curve', url: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/dissociation_curve.ipynb' },
  { name: 'Excited States', url: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/excited_states.ipynb' },
  { name: 'LiH Dissociation', url: 'https://github.com/AyushDocs/vqe/blob/main/notebooks/lih_dissociation.ipynb' }
]

export default function Home() {
  const [molecule, setMolecule] = useState('h2')
  const [bondDistance, setBondDistance] = useState(0.735)
  const [maxIterations, setMaxIterations] = useState(100)
  const [optimizer, setOptimizer] = useState('COBYLA')
  const [useAdapt, setUseAdapt] = useState(false)
  const [noiseShots, setNoiseShots] = useState<number | null>(null)
  const [showExcited, setShowExcited] = useState(false)
  const [curveMode, setCurveMode] = useState(false)
  const [curveMin, setCurveMin] = useState(0.5)
  const [curveMax, setCurveMax] = useState(2.5)
  const [curvePoints, setCurvePoints] = useState(10)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRun = async () => {
    setIsRunning(true)
    setError(null)
    setResults(null)

    const body: any = {
      molecule,
      bondDistance,
      maxIterations,
      optimizer: optimizer.toLowerCase(),
      useAdapt,
      noiseShots: noiseShots ?? null,
      excitedStates: showExcited
    }

    if (curveMode) {
      const step = (curveMax - curveMin) / (curvePoints - 1)
      const distances = Array.from({ length: curvePoints }, (_, i) =>
        Math.round((curveMin + i * step) * 100) / 100
      )
      body.curveMode = true
      body.curveDistances = distances
    }

    if (!curveMode && noiseShots === -1) {
      body.noiseShots = -1
    }

    try {
      const response = await fetch('/api/vqe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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
    <div className="container">
      <section className="hero" style={{ paddingBottom: '24px' }}>
        <h1 className="hero-title">Quantum Chemistry in Your Browser</h1>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 380px) 1fr',
        gap: '24px',
        paddingBottom: '48px'
      }}>
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Atom size={20} />
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

            <a
              href={notebookLinks[molecule]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '12px',
                fontSize: '13px',
                color: 'var(--accent-blue)',
                textDecoration: 'none'
              }}
            >
              <BookOpen size={14} />
              View notebook on GitHub
            </a>
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
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={curveMode}
                  onChange={(e) => setCurveMode(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Dissociation Curve Mode
              </label>
            </div>

            {curveMode ? (
              <>
                <div className="form-group">
                  <label className="form-label">Distance Range (Å)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      className="form-select"
                      style={{ width: '50%' }}
                      min="0.3"
                      max="4.0"
                      step="0.1"
                      value={curveMin}
                      onChange={(e) => setCurveMin(parseFloat(e.target.value))}
                    />
                    <span style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>to</span>
                    <input
                      type="number"
                      className="form-select"
                      style={{ width: '50%' }}
                      min="0.3"
                      max="4.0"
                      step="0.1"
                      value={curveMax}
                      onChange={(e) => setCurveMax(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Points: {curvePoints}</label>
                  <input
                    type="range"
                    className="range-input"
                    min="5"
                    max="30"
                    step="1"
                    value={curvePoints}
                    onChange={(e) => setCurvePoints(parseInt(e.target.value))}
                  />
                </div>
              </>
            ) : (
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
            )}

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

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={useAdapt}
                  onChange={(e) => setUseAdapt(e.target.checked)}
                />
                <GitBranch size={14} />
                ADAPT-VQE (sparser ansatz)
              </label>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={noiseShots !== null}
                  onChange={(e) => setNoiseShots(e.target.checked ? -1 : null)}
                />
                <Zap size={14} />
                Noise Simulation
              </label>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={showExcited}
                  onChange={(e) => setShowExcited(e.target.checked)}
                />
                <Activity size={14} />
                Excited States
              </label>
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
                {curveMode ? 'Computing curve...' : 'Running...'}
              </>
            ) : (
              <>
                <Play size={20} />
                {curveMode ? 'Run Dissociation Curve' : 'Run VQE'}
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
                  <Atom size={48} strokeWidth={1.5} />
                  <p>Configure parameters and click &quot;Run VQE&quot;</p>
                </div>
              )}

              {isRunning && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {curveMode ? 'Computing dissociation curve...' : 'Running VQE calculation...'}
                  </p>
                </div>
              )}

              {error && (
                <div className="error-message">{error}</div>
              )}

              {results && results.noiseScan && (
                <div>
                  <div className="energy-display">
                    <p className="energy-label">Shot Noise Analysis</p>
                    <p className="energy-unit">Energy variance across shot counts (8 runs each)</p>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <svg viewBox="0 0 500 220" style={{ width: '100%', height: 'auto' }}>
                      {(() => {
                        const pd2 = { top: 16, right: 16, bottom: 32, left: 56 }
                        const iw2 = 500 - pd2.left - pd2.right
                        const ih2 = 220 - pd2.top - pd2.bottom
                        const scan = results.noiseScan as { shots: number; mean: number; std: number; min: number; max: number }[]
                        const allM = scan.map(s => s.mean)
                        const allErr = scan.map(s => s.std)
                        const yMin = Math.min(...allM.map((m, i) => m - allErr[i])) - 0.01
                        const yMax = Math.max(...allM.map((m, i) => m + allErr[i])) + 0.01
                        const xMin = Math.log10(scan[0].shots)
                        const xMax = Math.log10(scan[scan.length - 1].shots)

                        const sx2 = (v: number) => pd2.left + ((Math.log10(v) - xMin) / (xMax - xMin)) * iw2
                        const sy2 = (v: number) => pd2.top + ((yMax - v) / (yMax - yMin)) * ih2

                        const yTicks = Array.from({ length: 4 }, (_, i) => {
                          const v = yMin + (i / 4) * (yMax - yMin)
                          return { v, y: sy2(v) }
                        })

                        return (
                          <g>
                            {yTicks.map((t, i) => (
                              <g key={i}>
                                <line x1={pd2.left} y1={t.y} x2={500 - pd2.right} y2={t.y} stroke="var(--border-subtle)" strokeWidth="1" />
                                <text x={pd2.left - 6} y={t.y} textAnchor="end" dominantBaseline="middle" fill="var(--text-muted)" fontSize="10" fontFamily="JetBrains Mono, monospace">
                                  {t.v.toFixed(3)}
                                </text>
                              </g>
                            ))}
                            {scan.map((s, i) => {
                              const x = sx2(s.shots)
                              const y = sy2(s.mean)
                              const yLo = sy2(s.mean - s.std)
                              const yHi = sy2(s.mean + s.std)
                              return (
                                <g key={i}>
                                  <line x1={x} y1={yLo} x2={x} y2={yHi} stroke="var(--accent-blue)" strokeWidth="2" />
                                  <line x1={x - 4} y1={yLo} x2={x + 4} y2={yLo} stroke="var(--accent-blue)" strokeWidth="1.5" />
                                  <line x1={x - 4} y1={yHi} x2={x + 4} y2={yHi} stroke="var(--accent-blue)" strokeWidth="1.5" />
                                  <circle cx={x} cy={y} r="4" fill="var(--accent-blue)" stroke="none" />
                                  <text x={x} y={220 - pd2.bottom + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="9" transform={`rotate(-30, ${x}, ${220 - pd2.bottom + 14})`}>
                                    {s.shots}
                                  </text>
                                </g>
                              )
                            })}
                            <line x1={pd2.left} y1={220 - pd2.bottom} x2={500 - pd2.right} y2={220 - pd2.bottom} stroke="var(--border-subtle)" strokeWidth="1" />
                            <text x={250} y={220 - 4} textAnchor="middle" fill="var(--text-muted)" fontSize="10">Shots (log scale)</text>
                            <text x={10} y={110} textAnchor="middle" fill="var(--text-muted)" fontSize="10" transform={`rotate(-90, 10, 110)`}>Energy (Ha)</text>
                          </g>
                        )
                      })()}
                    </svg>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '8px' }}>
                      Error bars show ±1 std. dev. across 8 runs per shot count
                    </p>
                  </div>
                </div>
              )}

              {results && !results.curve && !results.noiseScan && (
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
                    {results.useAdapt && results.adaptParams && (
                      <div className="stat-item">
                        <p className="stat-value">{results.adaptParams}</p>
                        <p className="stat-label">ADAPT params</p>
                      </div>
                    )}
                  </div>

                  {results.useAdapt && results.adaptParams && results.uccsdParams && (
                    <div className="card" style={{ marginTop: '16px', padding: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Ansatz Sparsity</h4>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', justifyContent: 'center', padding: '8px 0' }}>
                        {[
                          { label: 'UCCSD', value: results.uccsdParams, color: 'var(--accent-blue)' },
                          { label: 'ADAPT', value: results.adaptParams, color: 'var(--accent-green)' }
                        ].map((bar, i) => {
                          const maxVal = Math.max(results.uccsdParams, results.adaptParams)
                          const h = (bar.value / maxVal) * 120
                          return (
                            <div key={i} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', marginBottom: '4px' }}>{bar.value}</div>
                              <div style={{
                                width: '48px',
                                height: `${h}px`,
                                background: bar.color,
                                borderRadius: '4px 4px 0 0',
                                opacity: 0.8
                              }} />
                              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{bar.label}</div>
                            </div>
                          )
                        })}
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4px' }}>
                        {Math.round((1 - results.adaptParams / results.uccsdParams) * 100)}% fewer parameters
                      </p>
                    </div>
                  )}

                  {results.excitedStates && results.excitedStates.length > 0 && (
                    <div className="card" style={{ marginTop: '16px', padding: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Excited States</h4>
                      <ExcitedStateDiagram
                        exactGround={results.exactEnergy}
                        computedGround={results.vqeEnergy}
                        excitedStates={results.excitedStates}
                      />
                    </div>
                  )}
                </div>
              )}

              {results && results.curve && (
                <div>
                  <div className="energy-display">
                    <p className="energy-label">Dissociation Curve</p>
                    <p className="energy-unit">
                      {results.curve.distances[0].toFixed(2)} Å – {results.curve.distances[results.curve.distances.length - 1].toFixed(2)} Å
                      ({results.curve.distances.length} points)
                    </p>
                  </div>
                  <DissociationChart
                    distances={results.curve.distances}
                    vqeEnergies={results.curve.vqeEnergies}
                    exactEnergies={results.curve.exactEnergies}
                    adaptEnergies={results.curve.adaptEnergies}
                  />
                </div>
              )}
            </div>
          </div>

          {results && !results.curve && !results.noiseScan && results.energyHistory && (
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

          <div className="card" style={{ marginTop: '16px' }}>
            <div className="card-header">
              <div className="card-icon" style={{ background: 'var(--gradient-green)' }}>
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="card-title">Notebooks on GitHub</h3>
                <p className="card-subtitle">Explore detailed Jupyter notebooks</p>
              </div>
            </div>
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {allNotebooks.map((nb, i) => (
                <a
                  key={i}
                  href={nb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'var(--bg-secondary)',
                    color: 'var(--accent-blue)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  <BookOpen size={14} />
                  {nb.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
