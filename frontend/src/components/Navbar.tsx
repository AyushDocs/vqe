'use client'

import Link from 'next/link'
import { Atom } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-content">
        <Link href="/" className="nav-logo">
          <Atom size={24} />
          <span>VQE Simulator</span>
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <a href="https://github.com/AyushDocs/vqe.git" className="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </nav>
  )
}
