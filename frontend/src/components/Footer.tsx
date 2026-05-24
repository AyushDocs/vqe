import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <Link href="https://github.com/AyushDocs/vqe.git" target="_blank" rel="noopener noreferrer">View on GitHub</Link>
        </p>
      </div>
    </footer>
  )
}
