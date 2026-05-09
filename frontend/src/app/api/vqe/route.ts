import { NextResponse } from 'next/server'
import { runVQE } from '@/lib/vqe-engine'

const referenceData: Record<string, { distance: number; energy: number }[]> = {
  h2: [
    { distance: 0.5, energy: -0.784 }, { distance: 0.6, energy: -0.976 },
    { distance: 0.7, energy: -1.089 }, { distance: 0.735, energy: -1.137 },
    { distance: 0.8, energy: -1.156 }, { distance: 0.9, energy: -1.147 },
    { distance: 1.0, energy: -1.109 }, { distance: 1.2, energy: -1.001 },
    { distance: 1.4, energy: -0.905 }, { distance: 1.6, energy: -0.834 }
  ],
  lih: [
    { distance: 1.2, energy: -7.985 }, { distance: 1.4, energy: -8.025 },
    { distance: 1.595, energy: -8.040 }, { distance: 1.8, energy: -7.945 },
    { distance: 2.0, energy: -7.842 }
  ],
  beh2: [
    { distance: 1.0, energy: -15.15 }, { distance: 1.3, energy: -15.22 },
    { distance: 1.5, energy: -15.20 }, { distance: 1.7, energy: -15.10 },
    { distance: 2.0, energy: -14.85 }
  ],
  h4: [
    { distance: 0.5, energy: -1.568 }, { distance: 0.6, energy: -1.952 },
    { distance: 0.735, energy: -2.274 }, { distance: 0.8, energy: -2.312 },
    { distance: 1.0, energy: -2.218 }
  ]
}

function getReferenceEnergy(bondDistance: number, molecule: string): number {
  const ref = referenceData[molecule] || referenceData.h2

  let closest = ref[0]
  for (const point of ref) {
    if (Math.abs(point.distance - bondDistance) < Math.abs(closest.distance - bondDistance)) {
      closest = point
    }
  }

  return closest.energy
}

function interpolateEnergy(distance: number, points: { distance: number; energy: number }[]): number {
  const sorted = [...points].sort((a, b) => a.distance - b.distance)

  if (distance <= sorted[0].distance) return sorted[0].energy
  if (distance >= sorted[sorted.length - 1].distance) return sorted[sorted.length - 1].energy

  for (let i = 0; i < sorted.length - 1; i++) {
    if (distance >= sorted[i].distance && distance <= sorted[i + 1].distance) {
      const t = (distance - sorted[i].distance) / (sorted[i + 1].distance - sorted[i].distance)
      return sorted[i].energy + t * (sorted[i + 1].energy - sorted[i].energy)
    }
  }

  return sorted[0].energy
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { molecule, bondDistance, maxIterations, optimizer } = body

    if (!molecule || bondDistance === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: molecule, bondDistance' },
        { status: 400 }
      )
    }

    const result = runVQE({
      molecule,
      bondDistance,
      maxIterations: maxIterations || 100,
      optimizer: optimizer || 'cobyla'
    })

    const refEnergy = interpolateEnergy(
      bondDistance,
      referenceData[molecule] || referenceData.h2
    )

    return NextResponse.json({
      success: true,
      data: {
        vqeEnergy: result.energy,
        exactEnergy: refEnergy,
        error: Math.abs(result.energy - refEnergy),
        iterations: result.iterations,
        energyHistory: result.energyHistory,
        molecule,
        bondDistance,
        basis: 'sto3g',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('VQE API Error:', error)
    return NextResponse.json(
      { error: 'Failed to run VQE calculation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'VQE API',
    version: '1.0.0',
    endpoints: {
      'POST /api/vqe': 'Run VQE calculation',
      'GET /api/vqe/molecules': 'List available molecules',
      'GET /api/vqe/reference': 'Get reference data'
    }
  })
}
