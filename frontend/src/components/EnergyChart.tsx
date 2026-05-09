'use client'

interface EnergyChartProps {
  data: number[]
  exactEnergy: number
}

export default function EnergyChart({ data, exactEnergy }: EnergyChartProps) {
  const height = 250
  const padding = { top: 20, right: 20, bottom: 30, left: 50 }
  const chartWidth = 600
  const chartHeight = height - padding.top - padding.bottom
  const innerWidth = chartWidth - padding.left - padding.right

  const minEnergy = Math.min(...data, exactEnergy) - 0.05
  const maxEnergy = Math.max(...data, exactEnergy) + 0.05

  const scaleX = (i: number) => padding.left + (i / (data.length - 1)) * innerWidth
  const scaleY = (e: number) => padding.top + ((maxEnergy - e) / (maxEnergy - minEnergy)) * chartHeight

  const pathD = data.map((energy, i) => {
    const x = scaleX(i)
    const y = scaleY(energy)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  const exactY = scaleY(exactEnergy)

  const yTicks = []
  const tickCount = 5
  for (let i = 0; i <= tickCount; i++) {
    const value = minEnergy + (i / tickCount) * (maxEnergy - minEnergy)
    yTicks.push({ value, y: scaleY(value) })
  }

  return (
    <div className="chart-container" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginBottom: '12px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '3px', background: 'var(--accent-blue)', borderRadius: '2px' }} />
          <span style={{ color: 'var(--text-secondary)' }}>VQE Energy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '3px', background: 'var(--accent-red)', borderRadius: '2px', borderStyle: 'dashed', borderWidth: '1px', background: 'transparent', borderColor: 'var(--accent-red)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Exact</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${chartWidth} ${height}`} style={{ width: '100%', height: 'auto' }}>
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={tick.y}
              x2={chartWidth - padding.right}
              y2={tick.y}
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 8}
              y={tick.y}
              textAnchor="end"
              dominantBaseline="middle"
              fill="var(--text-muted)"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
            >
              {tick.value.toFixed(3)}
            </text>
          </g>
        ))}

        <line
          x1={padding.left}
          y1={exactY}
          x2={chartWidth - padding.right}
          y2={exactY}
          stroke="var(--accent-red)"
          strokeWidth="2"
          strokeDasharray="6,4"
          opacity="0.7"
        />

        <path
          d={pathD}
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={chartWidth - padding.right}
          y2={height - padding.bottom}
          stroke="var(--border-subtle)"
          strokeWidth="1"
        />

        <text
          x={chartWidth / 2}
          y={height - 5}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="11"
        >
          Iteration
        </text>

        <text
          x={12}
          y={height / 2}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="11"
          transform={`rotate(-90, 12, ${height / 2})`}
        >
          Energy (Ha)
        </text>
      </svg>
    </div>
  )
}
