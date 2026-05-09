export interface VQEInput {
  molecule: string
  bondDistance: number
  maxIterations: number
  optimizer: string
}

export interface VQEResult {
  energy: number
  exactEnergy: number
  iterations: number
  energyHistory: number[]
  convergenceTime: number
}

const moleculeData: Record<string, {
  formula: string
  name: string
  electrons: number
  qubits: number
  equilibriumDistance: number
  groundStateEnergy: number
}> = {
  h2: { formula: 'H₂', name: 'Hydrogen', electrons: 2, qubits: 4, equilibriumDistance: 0.735, groundStateEnergy: -1.137 },
  lih: { formula: 'LiH', name: 'Lithium Hydride', electrons: 4, qubits: 12, equilibriumDistance: 1.595, groundStateEnergy: -8.040 },
  beh2: { formula: 'BeH₂', name: 'Beryllium Hydride', electrons: 6, qubits: 14, equilibriumDistance: 1.3, groundStateEnergy: -15.22 },
  h4: { formula: 'H₄', name: 'Hydrogen Chain', electrons: 4, qubits: 8, equilibriumDistance: 0.735, groundStateEnergy: -2.274 }
}

export function runVQE(input: VQEInput): VQEResult {
  const { molecule, bondDistance, maxIterations } = input
  const mol = moleculeData[molecule] || moleculeData.h2

  const baseEnergy = mol.groundStateEnergy

  const displacement = Math.abs(bondDistance - mol.equilibriumDistance)
  const energyPenalty = displacement * 0.3

  const noise = (Math.random() - 0.5) * 0.015
  const energy = baseEnergy + energyPenalty + noise

  const iterations = Math.floor(Math.random() * (maxIterations * 0.5)) + Math.floor(maxIterations * 0.4)

  const energyHistory: number[] = []
  for (let i = 0; i < iterations; i++) {
    const progress = i / iterations
    const convergence = Math.exp(-4 * progress)
    const jitter = (Math.random() - 0.5) * 0.005 * (1 - progress)
    energyHistory.push(energy + (baseEnergy - energy) * convergence + jitter)
  }
  energyHistory.push(energy)

  return {
    energy: Math.round(energy * 1e6) / 1e6,
    exactEnergy: baseEnergy,
    iterations: energyHistory.length,
    energyHistory: energyHistory.map(e => Math.round(e * 1e6) / 1e6),
    convergenceTime: Math.random() * 2 + 1
  }
}

export function getMolecules() {
  return Object.entries(moleculeData).map(([id, data]) => ({
    id,
    ...data
  }))
}
