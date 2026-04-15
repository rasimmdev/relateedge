import type { Metadata } from 'next'
import Link from 'next/link'
import HeroOrbit from '@/components/HeroOrbit'
import ButtonLink from '@/components/Button'
import StackingCards from '@/components/StackingCards'
import LogoCarousel from '@/components/LogoCarousel'
import { IcSparkle } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'RelateEdge — Write proposals that get replies',
  description: 'Paste any Upwork job description and get a personalized, high-scoring proposal in seconds.',
}
const STEPS = [
  { n: '01', title: 'Paste the job', desc: 'Copy any Upwork job description and drop it in. That\'s it.' },
  { n: '02', title: 'AI does the work', desc: 'RelateEdge analyzes the job, scores it, and generates a tailored proposal with high-impact hooks.' },
  { n: '03', title: 'Copy, send, win', desc: 'One click to copy your proposal. Send it, track replies, and learn from every interaction.' },
]
export default function Home() {
  return (
    <main style={{ position: 'relative' }}>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)', animation: 'blobPulse 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '40px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(113,112,182,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)', animation: 'blobPulse2 14s ease-in-out infinite',
        }} />
      </div>
      <section
        className="max-w-[1360px] w-full mx-auto px-6 xl:px-0 pt-20 pb-28"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>

          <div style={{ flex: '0 0 48%', maxWidth: '568px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '12px', fontWeight: 600, color: '#4F46E5',
              padding: '5px 12px', borderRadius: '999px',
              border: '1px solid rgba(79,70,229,0.2)',
              background: 'rgba(79,70,229,0.06)',
              marginBottom: '24px',
              animation: 'fadeInUp 0.5s ease forwards',
            }}>
              <span style={{ width: '12px', height: '12px', color: '#4F46E5' }}><IcSparkle /></span>
              Built for Upwork freelancers
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 4.5vw, 60px)', lineHeight: 1.07,
              fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '20px',
              animation: 'fadeInUp 0.5s ease 0.1s both',
            }}>
              <span style={{ color: '#0f172a' }}>
                Write proposals<br />that actually<br />
              </span>
              <span style={{
                background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #4F46E5 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'gradientShift 3s linear infinite',
              }}>
                get replies.
              </span>
            </h1>

            <p style={{
              fontSize: '17px', lineHeight: 1.7, color: '#64748b',
              marginBottom: '32px', animation: 'fadeInUp 0.5s ease 0.2s both',
            }}>
              Paste any job description. Get a personalized proposal in
              seconds — not a template.{' '}
              <span style={{ color: '#334155', fontWeight: 500 }}>A message that converts.</span>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', animation: 'fadeInUp 0.5s ease 0.3s both' }}>
              <ButtonLink href="/proposal/new" variant="primary">Generate Free Proposal →</ButtonLink>
              <Link href="#features" style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-slate-800">
                See how it works ↗
              </Link>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '28px',
              marginTop: '40px', paddingTop: '24px',
              borderTop: '1px solid rgba(0,0,0,0.07)',
              animation: 'fadeInUp 0.5s ease 0.4s both',
            }}>
              {[
                { value: '2,400+', label: 'proposals generated' },
                { value: '68%',    label: 'avg. reply rate' },
                { value: '$1.2M',  label: 'earned by users' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: '0 0 48%', display: 'flex', justifyContent: 'center' }}>
            <HeroOrbit />
          </div>
        </div>
      </section>
      <section style={{
        borderTop: '1px solid rgba(0,0,0,0.05)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(248,249,255,0.5)',
        position: 'relative', zIndex: 1,
      }}>
        <div className="max-w-[1360px] mx-auto px-6 xl:px-0" style={{ paddingTop: '24px' }}>
          <div style={{
            textAlign: 'center', fontSize: '11px', fontWeight: 600,
            color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            Trusted by freelancers on
          </div>
          <LogoCarousel />
        </div>
      </section>
      <section id="features" className="max-w-[1060px] mx-auto px-6 xl:px-0 py-24">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', fontWeight: 600, color: '#4F46E5',
            padding: '4px 12px', borderRadius: '999px',
            border: '1px solid rgba(79,70,229,0.18)',
            background: 'rgba(79,70,229,0.05)',
            marginBottom: '16px',
          }}>
            <span style={{ width: '12px', height: '12px', color: '#4F46E5' }}><IcSparkle /></span>
            Features
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Everything you need to win on Upwork
          </h2>
          <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            From raw job post to winning proposal — RelateEdge handles the whole flow.
          </p>
        </div>

        <StackingCards />
      </section>
      <section style={{ background: '#0a0f1c', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '300px', background: 'radial-gradient(ellipse at top, rgba(79,70,229,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        
        <div className="max-w-[1100px] mx-auto px-6 xl:px-0 py-32">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '64px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '-40px', left: '-20px', fontSize: '110px',
                fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1,
                letterSpacing: '-0.04em', pointerEvents: 'none',
              }}>
                01
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                Sync Job
              </h3>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.7 }}>
                Copy and paste the job description or sync directly from Upwork or LinkedIn. We extract the core requirements automatically.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '-40px', left: '-20px', fontSize: '110px',
                fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1,
                letterSpacing: '-0.04em', pointerEvents: 'none',
              }}>
                02
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                AI Draft
              </h3>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.7 }}>
                Our engine generates a personalized draft that matches your unique voice with the client&apos;s specific needs and pain points.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '-40px', left: '-20px', fontSize: '110px',
                fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1,
                letterSpacing: '-0.04em', pointerEvents: 'none',
              }}>
                03
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                Score & Send
              </h3>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.7 }}>
                Review your optimization score, make final tweaks, and send. Then, sit back and watch the performance analytics roll in.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '120px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1060px] mx-auto px-6 xl:px-0">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            
            <div>
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#0f172a',
                letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px',
              }}>
                Invest in your<br/>career growth.
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6, marginBottom: '32px', maxWidth: '380px' }}>
                Join 6,000+ freelancers who have doubled their conversion rates. Simple, transparent pricing for every stage of your business.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Unlimited AI-Generated Proposals',
                  'Advanced Proposal Analytics',
                  '24/7 Priority AI Coaching',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(79,70,229,0.1)',
                      color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '24px',
              padding: '48px 40px', boxShadow: '0 24px 80px rgba(0,0,0,0.06)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: '24px', right: '24px',
                background: '#4F46E5', color: '#fff', fontSize: '10px', fontWeight: 800,
                padding: '4px 12px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>
                Most Popular
              </div>

              <div style={{ fontSize: '11px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Professional Plan
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1 }}>$29</span>
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 500 }}>/month</span>
              </div>

              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '32px' }}>
                Everything you need to turn proposal writing into your greatest competitive advantage.
              </p>

              <ButtonLink href="/signup" style={{ width: '100%', textAlign: 'center', boxShadow: '0 8px 24px rgba(79,70,229,0.25)', padding: '16px 0' }}>
                Start 14-day Free Trial
              </ButtonLink>
              
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '16px' }}>
                No credit card required for trial.
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </main>
  )
}
