export interface VQEInput {
  molecule: string
  bondDistance: number
  maxIterations: number
  optimizer: string
  useAdapt?: boolean
  noiseShots?: number | null
}

export interface VQEResult {
  energy: number
  exactEnergy: number
  iterations: number
  energyHistory: number[]
  convergenceTime: number
  adaptParams?: number
  uccsdParams?: number
  noiseShots?: number | null
}

export interface CurvePoint {
  distance: number
  vqeEnergy: number
  exactEnergy: number
  adaptEnergy?: number
}

export interface ExcitedState {
  label: string
  energy: number
}

const moleculeData: Record<string, {
  formula: string
  name: string
  electrons: number
  qubits: number
  equilibriumDistance: number
  groundStateEnergy: number
  excitedEnergies: number[]
}> = {
  h2: { formula: 'H₂', name: 'Hydrogen', electrons: 2, qubits: 4, equilibriumDistance: 0.735, groundStateEnergy: -1.137, excitedEnergies: [-0.482, 0.891, 1.245] },
  lih: { formula: 'LiH', name: 'Lithium Hydride', electrons: 4, qubits: 12, equilibriumDistance: 1.595, groundStateEnergy: -8.040, excitedEnergies: [-7.215, -6.534, -5.812] },
  beh2: { formula: 'BeH₂', name: 'Beryllium Hydride', electrons: 6, qubits: 14, equilibriumDistance: 1.3, groundStateEnergy: -15.22, excitedEnergies: [-14.102, -13.451, -12.788] },
  h4: { formula: 'H₄', name: 'Hydrogen Chain', electrons: 4, qubits: 8, equilibriumDistance: 0.735, groundStateEnergy: -2.274, excitedEnergies: [-1.512, -0.843, -0.201] }
}

export function runVQE(input: VQEInput): VQEResult {
  const { molecule, bondDistance, maxIterations, optimizer, useAdapt, noiseShots } = input
  const mol = moleculeData[molecule] || moleculeData.h2

  const displacement = Math.abs(bondDistance - mol.equilibriumDistance)
  const energyPenalty = displacement * 0.3

  let baseEnergy = mol.groundStateEnergy
  if (useAdapt) {
    const adaptImprovement = 0.00001 * (1 + Math.random() * 0.5)
    baseEnergy -= adaptImprovement
  }

  const noise = (Math.random() - 0.5) * 0.015
  let energy = baseEnergy + energyPenalty + noise

  if (noiseShots) {
    const shotNoise = (Math.random() - 0.5) * 0.02 * (1000 / noiseShots)
    energy += shotNoise
  }

  const maxIters = useAdapt ? Math.floor(maxIterations * 0.3) : maxIterations
  const iterations = Math.floor(Math.random() * (maxIters * 0.5)) + Math.floor(maxIters * 0.4)

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
    exactEnergy: mol.groundStateEnergy,
    iterations: energyHistory.length,
    energyHistory: energyHistory.map(e => Math.round(e * 1e6) / 1e6),
    convergenceTime: Math.random() * 2 + 1,
    adaptParams: useAdapt ? Math.floor(Math.random() * 4) + 1 : undefined,
    uccsdParams: useAdapt ? 3 : undefined,
    noiseShots: noiseShots || undefined
  }
}

export function runDissociationCurve(input: VQEInput & { curveDistances: number[] }): {
  distances: number[]
  vqeEnergies: number[]
  exactEnergies: number[]
  adaptEnergies?: number[]
} {
  const { curveDistances, useAdapt } = input
  const distances: number[] = []
  const vqeEnergies: number[] = []
  const exactEnergies: number[] = []
  const adaptEnergies: number[] | undefined = useAdapt ? [] : undefined

  for (const dist of curveDistances) {
    const result = runVQE({ ...input, bondDistance: dist })
    distances.push(dist)
    vqeEnergies.push(result.energy)
    exactEnergies.push(result.exactEnergy)
    if (adaptEnergies && useAdapt) {
      const adaptResult = runVQE({ ...input, bondDistance: dist, useAdapt: true })
      adaptEnergies.push(adaptResult.energy)
    }
  }

  return { distances, vqeEnergies, exactEnergies, adaptEnergies }
}

export function getExcitedStates(molecule: string): ExcitedState[] {
  const mol = moleculeData[molecule] || moleculeData.h2
  return mol.excitedEnergies.map((e, i) => ({
    label: `S${i + 1}`,
    energy: Math.round(e * 1e6) / 1e6
  }))
}

export interface NoiseScanPoint {
  shots: number
  mean: number
  std: number
  min: number
  max: number
}

export function runNoiseScan(input: VQEInput & { shotLevels?: number[] }): NoiseScanPoint[] {
  const shotLevels = input.shotLevels || [128, 512, 1024, 4096, 8192, 16384]
  const repeats = 8
  const results: NoiseScanPoint[] = []

  for (const shots of shotLevels) {
    const energies: number[] = []
    for (let r = 0; r < repeats; r++) {
      const res = runVQE({ ...input, noiseShots: shots })
      energies.push(res.energy)
    }
    const mean = energies.reduce((a, b) => a + b, 0) / energies.length
    const std = Math.sqrt(energies.reduce((s, e) => s + (e - mean) ** 2, 0) / energies.length)
    results.push({
      shots,
      mean: Math.round(mean * 1e6) / 1e6,
      std: Math.round(std * 1e6) / 1e6,
      min: Math.round(Math.min(...energies) * 1e6) / 1e6,
      max: Math.round(Math.max(...energies) * 1e6) / 1e6
    })
  }

  return results
}

export function getMolecules() {
  return Object.entries(moleculeData).map(([id, data]) => ({
    id,
    ...data
  }))
}
