import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Built with <Link href="https://qiskit.org" target="_blank" rel="noopener noreferrer">Qiskit</Link> |
          <Link href="https://github.com/yourusername/vqe" target="_blank" rel="noopener noreferrer"> View on GitHub</Link>
        </p>
        <p style={{ marginTop: '8px' }}>
          Inspired by the original <a href="https://arxiv.org/abs/1304.3061" target="_blank" rel="noopener noreferrer">VQE paper</a> by Peruzzo et al.
        </p>
      </div>
    </footer>
  )
}
