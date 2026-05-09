'use client'

interface ResultsDisplayProps {
  energy: number | null
  exactEnergy: number | null
  iterations: number | null
  isRunning: boolean
  hasRun: boolean
  error: string | null
}

export default function ResultsDisplay({
  energy,
  exactEnergy,
  iterations,
  isRunning,
  hasRun,
  error
}: ResultsDisplayProps) {
  return (
    <div className="results-panel">
      <div className="results-header">
        <span className="results-title">Results</span>
        <div className="results-status">
          {!hasRun && !isRunning && <><div className="status-dot" /> Idle</>}
          {isRunning && <><div className="status-dot running" /> Running</>}
          {hasRun && !error && <><div className="status-dot success" /> Complete</>}
          {error && <><div className="status-dot error" /> Error</>}
        </div>
      </div>

      <div className="results-body">
        {!hasRun && !isRunning && (
          <div className="results-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <p>Configure parameters and click &quot;Run VQE&quot; to see results</p>
          </div>
        )}

        {isRunning && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="loading-spinner" style={{ width: '40px', height: '40px', margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Running VQE calculation...</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>
              This typically takes 30-60 seconds
            </p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {hasRun && energy !== null && !error && (
          <div>
            <div className="energy-display">
              <p className="energy-label">Ground State Energy</p>
              <p className="energy-value">{energy.toFixed(6)}</p>
              <p className="energy-unit">Hartrees (Ha)</p>
              {exactEnergy !== null && (
                <div className="energy-comparison">
                  <span className="energy-compare-item">
                    Exact: <span className="energy-compare-value">{exactEnergy.toFixed(6)} Ha</span>
                  </span>
                  <span className="energy-compare-item">
                    Error: <span className="energy-compare-value">{(energy - exactEnergy).toFixed(6)} Ha</span>
                  </span>
                </div>
              )}
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-value">{iterations ?? '-'}</p>
                <p className="stat-label">Iterations</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{Math.abs(energy - (exactEnergy ?? energy)).toFixed(6)}</p>
                <p className="stat-label">Error (Ha)</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">STO-3G</p>
                <p className="stat-label">Basis Set</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
