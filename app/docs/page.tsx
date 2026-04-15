import type { Metadata } from 'next'
import { IcSparkle } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Docs — RelateEdge',
  description: 'API Documentation for RelateEdge.',
}

export default function Docs() {
  return (
    <main style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(79,70,229,0.05)',
          color: '#4F46E5', marginBottom: '24px',
        }}>
          <div style={{ width: '32px', height: '32px' }}><IcSparkle /></div>
        </div>
        <h1 style={{
          fontSize: '36px', fontWeight: 800, color: '#0f172a',
          letterSpacing: '-0.03em', marginBottom: '16px',
        }}>
          Docs is coming soon
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
          We are currently working on finalizing our public API and developer documentation. Check back later!
        </p>
      </div>
    </main>
  )
}
