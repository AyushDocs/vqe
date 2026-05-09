'use client'

import { Play } from 'lucide-react'

interface RunPanelProps {
  onRun: () => void
  isRunning: boolean
  disabled: boolean
}

export default function RunPanel({ onRun, isRunning, disabled }: RunPanelProps) {
  return (
    <div className="card" style={{ marginTop: '16px' }}>
      <button
        className="btn btn-primary btn-full"
        onClick={onRun}
        disabled={disabled || isRunning}
        style={{ padding: '16px', fontSize: '16px' }}
      >
        {isRunning ? (
          <>
            <div className="loading-spinner" />
            Running VQE...
          </>
        ) : (
          <>
            <Play size={20} />
            Run VQE Calculation
          </>
        )}
      </button>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
        Uses quantum simulator (local) or IBM Quantum hardware (with API key)
      </p>
    </div>
  )
}
