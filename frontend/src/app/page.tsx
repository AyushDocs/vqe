import Link from 'next/link'
import { Atom } from 'lucide-react'

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Quantum Chemistry in Your Browser</h1>
        <p className="hero-subtitle">
          Run Variational Quantum Eigensolver (VQE) calculations without installation.
          Select a molecule, adjust parameters, and see quantum chemistry in action.
        </p>
        <div className="hero-badges">
          <span className="badge badge-blue">No Install Required</span>
          <span className="badge">Qiskit</span>
          <span className="badge">Interactive</span>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Link href="/simulator" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
            </svg>
            Open Simulator
          </Link>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, marginBottom: '48px' }}>
          How VQE Works
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          {['Classical', 'Quantum', 'Quantum', 'Classical'].map((step, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '20px 28px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: '⚛️', title: 'Quantum State Preparation', desc: 'Encode molecular information into qubits' },
            { icon: '⚡', title: 'Variational Optimization', desc: 'Explore energy landscape with quantum circuits' },
            { icon: '🧪', title: 'ADAPT-VQE', desc: 'Intelligently build circuits step-by-step' }
          ].map((item, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '48px',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        textAlign: 'center',
        marginBottom: '48px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
          Try It Now
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Select H₂, LiH, or other molecules. Adjust bond distance and watch energy change.
        </p>
        <Link href="/simulator" className="btn btn-primary">
          Launch Simulator
        </Link>
      </section>

      <section style={{ padding: '32px 0 64px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>
          Applications
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {['Drug Discovery', 'Materials Science', 'Catalysis', 'Climate Tech'].map((app, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              textAlign: 'center'
            }}>
              <p style={{ fontWeight: 600 }}>{app}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
