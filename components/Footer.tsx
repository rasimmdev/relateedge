import Link from 'next/link'
import { IcSparkle } from './Icons'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '80px 0 40px', background: '#fff' }}>
      <div className="max-w-[1200px] mx-auto px-6 xl:px-0">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px', justifyContent: 'space-between', marginBottom: '80px' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', marginBottom: '16px' }}>
              <div style={{ width: '22px', height: '22px' }}><IcSparkle /></div>
              <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Relate<span style={{ color: '#4F46E5' }}>Edge</span>
              </span>
            </div>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '24px', maxWidth: '320px' }}>
              The premium proposal engine for modern freelancers. Generate high-converting copy, score your results, and track performance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '48px', flex: '2 1 500px' }}>
            
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li><Link href="/how-it-works" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">How it works</Link></li>
                <li><Link href="/pricing" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">Pricing</Link></li>
                <li><Link href="/#" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">Live Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>For Devs</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li><Link href="/docs" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">API Docs</Link></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">GitHub Repository</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li><Link href="/privacy" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">Privacy Policy</Link></li>
                <li><Link href="/terms" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">Terms of Service</Link></li>
                <li><Link href="/cookie" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }} className="hover:text-indigo-600 hover:translate-x-1 inline-block">Cookie Guidelines</Link></li>
              </ul>
            </div>

          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.06)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            © {new Date().getFullYear()} RELATEEDGE AI. PRECISION ENGINEERING.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
