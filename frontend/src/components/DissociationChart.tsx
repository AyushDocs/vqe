'use client'

interface DissociationChartProps {
  distances: number[]
  vqeEnergies: number[]
  exactEnergies: number[]
  adaptEnergies?: number[]
}

export default function DissociationChart({ distances, vqeEnergies, exactEnergies, adaptEnergies }: DissociationChartProps) {
  const w = 600
  const h = 280
  const pd = { top: 20, right: 24, bottom: 36, left: 54 }
  const iw = w - pd.left - pd.right
  const ih = (h - pd.top - pd.bottom) / 2 - 8

  const merged = [...vqeEnergies, ...exactEnergies, ...(adaptEnergies || [])]
  const minE = Math.min(...merged) - 0.05
  const maxE = Math.max(...merged) + 0.05
  const minD = distances[0]
  const maxD = distances[distances.length - 1]

  const sx = (v: number) => pd.left + ((v - minD) / (maxD - minD)) * iw
  const sy0 = (v: number) => pd.top + ((maxE - v) / (maxE - minE)) * ih

  const curvePath = (vals: number[], color: string, dash?: string) =>
    vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(distances[i])} ${sy0(v)}`).join(' ')

  // Error subplot
  const vqeErrors = vqeEnergies.map((v, i) => Math.abs(v - exactEnergies[i]))
  const adaptErrors = adaptEnergies?.map((v, i) => Math.abs(v - exactEnergies[i]))
  const maxErr = Math.max(...vqeErrors, ...(adaptErrors || []), 1e-10)
  const logMin = -10
  const logMax = Math.log10(maxErr) + 0.5

  const sy1 = (v: number) => {
    const logV = Math.log10(Math.max(v, 1e-10))
    return pd.top + ih + 16 + ((logMax - logV) / (logMax - logMin)) * ih
  }

  const y0Ticks = Array.from({ length: 4 }, (_, i) => {
    const v = minE + (i / 4) * (maxE - minE)
    return { v, y: sy0(v) }
  })

  const y1Ticks = Array.from({ length: 4 }, (_, i) => {
    const v = Math.pow(10, logMin + (i / 4) * (logMax - logMin))
    return { v, y: sy1(v) }
  })

  return (
    <div style={{ padding: '16px' }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
        {y0Ticks.map((t, i) => (
          <g key={`y0-${i}`}>
            <line x1={pd.left} y1={t.y} x2={w - pd.right} y2={t.y} stroke="var(--border-subtle)" strokeWidth="1" />
            <text x={pd.left - 6} y={t.y} textAnchor="end" dominantBaseline="middle" fill="var(--text-muted)" fontSize="10" fontFamily="JetBrains Mono, monospace">
              {t.v.toFixed(1)}
            </text>
          </g>
        ))}

        <path d={curvePath(exactEnergies, 'var(--accent-red)')} fill="none" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />
        <path d={curvePath(vqeEnergies, 'var(--accent-blue)')} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {adaptEnergies && <path d={curvePath(adaptEnergies, 'var(--accent-green)')} fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" />}

        <text x={pd.left + iw / 2} y={pd.top + ih + 4} textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight={600}>Energy (Ha)</text>

        {/* Error subplot */}
        {y1Ticks.map((t, i) => (
          <g key={`y1-${i}`}>
            <line x1={pd.left} y1={t.y} x2={w - pd.right} y2={t.y} stroke="var(--border-subtle)" strokeWidth="1" />
            <text x={pd.left - 6} y={t.y} textAnchor="end" dominantBaseline="middle" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono, monospace">
              {t.v < 0.001 ? t.v.toExponential(0) : t.v.toFixed(3)}
            </text>
          </g>
        ))}

        {(() => {
          const errPath = vqeErrors.map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(distances[i])} ${sy1(v)}`).join(' ')
          const adaptErrPath = adaptErrors ? adaptErrors.map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(distances[i])} ${sy1(v)}`).join(' ') : ''
          return (
            <>
              <path d={errPath} fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {adaptErrPath && <path d={adaptErrPath} fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" />}
            </>
          )
        })()}

        <line x1={pd.left} y1={sy1(0.0016)} x2={w - pd.right} y2={sy1(0.0016)} stroke="var(--accent-red)" strokeWidth="1" strokeDasharray="2,3" opacity="0.5" />
        <text x={w - pd.right} y={sy1(0.0016) - 2} textAnchor="end" fill="var(--text-muted)" fontSize="8">chem. acc.</text>

        <line x1={pd.left} y1={pd.top + ih + 16 + ih} x2={w - pd.right} y2={pd.top + ih + 16 + ih} stroke="var(--border-subtle)" strokeWidth="1" />
        <text x={pd.left + iw / 2} y={h - 4} textAnchor="middle" fill="var(--text-muted)" fontSize="10">Bond Distance (Å)</text>

        <text x={10} y={pd.top + ih + 16 + ih / 2} textAnchor="middle" fill="var(--text-muted)" fontSize="9" transform={`rotate(-90, 10, ${pd.top + ih + 16 + ih / 2})`}>
          |Error| (Ha)
        </text>
      </svg>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', marginTop: '4px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 14, height: 3, background: 'var(--accent-blue)', borderRadius: 2, display: 'inline-block' }} /> VQE
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 14, height: 0, borderTop: '2px dashed var(--accent-red)', display: 'inline-block' }} /> Exact
        </span>
        {adaptEnergies && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 14, height: 0, borderTop: '2px dashed var(--accent-green)', display: 'inline-block' }} /> ADAPT
          </span>
        )}
      </div>
    </div>
  )
}
