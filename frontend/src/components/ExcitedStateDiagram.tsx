'use client'

interface ExcitedStateData {
  label: string
  energy: number
}

interface ExcitedStateDiagramProps {
  exactGround: number
  computedGround: number
  excitedStates: ExcitedStateData[]
}

export default function ExcitedStateDiagram({ exactGround, computedGround, excitedStates }: ExcitedStateDiagramProps) {
  const allEnergies = [exactGround, computedGround, ...excitedStates.map(e => e.energy)]
  const minE = Math.min(...allEnergies) - 0.1
  const maxE = Math.max(...allEnergies) + 0.1

  const w = 400
  const h = 280
  const pd = { top: 24, right: 24, bottom: 28, left: 60 }
  const iw = w - pd.left - pd.right
  const ih = h - pd.top - pd.bottom

  const sy = (v: number) => pd.top + ((maxE - v) / (maxE - minE)) * ih

  const states = [
    { label: 'S₀', exact: exactGround, computed: computedGround },
    ...excitedStates.map((es, i) => ({
      label: es.label,
      exact: allEnergies[0] + (es.energy - excitedStates[0].energy) * (exactGround / computedGround),
      computed: es.energy
    }))
  ]

  const x1 = pd.left + iw * 0.25
  const x2 = pd.left + iw * 0.75

  return (
    <div style={{ padding: '16px' }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
        {states.map((s, i) => {
          const yExact = sy(s.exact)
          const yComp = sy(s.computed)
          return (
            <g key={i}>
              <line x1={x1} y1={yExact} x2={x2} y2={yComp} stroke="var(--border-subtle)" strokeWidth="1" opacity="0.5" />
              <circle cx={x1} cy={yExact} r="5" fill="var(--accent-red)" stroke="none" />
              <circle cx={x2} cy={yComp} r="5" fill="var(--accent-blue)" stroke="none" />
              <text x={x1 - 8} y={yExact} textAnchor="end" dominantBaseline="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="JetBrains Mono, monospace">
                {s.exact.toFixed(3)}
              </text>
              <text x={x2 + 8} y={yComp} textAnchor="start" dominantBaseline="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="JetBrains Mono, monospace">
                {s.computed.toFixed(3)}
              </text>
              <text x={(x1 + x2) / 2} y={Math.min(yExact, yComp) - 8} textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight={600}>
                {s.label}
              </text>
            </g>
          )
        })}

        <text x={x1} y={h - 4} textAnchor="middle" fill="var(--text-secondary)" fontSize="11">Exact</text>
        <text x={x2} y={h - 4} textAnchor="middle" fill="var(--text-secondary)" fontSize="11">Computed</text>
      </svg>
    </div>
  )
}
