import type { Metadata } from 'next'
import Link from 'next/link'
import ButtonLink from '@/components/Button'
import { IcSparkle, IcSearch, IcPen, IcChart, IcTarget, IcShield, IcRocket, IcZap } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'How It Works — RelateEdge',
  description: 'See how RelateEdge helps you write winning Upwork proposals in 3 simple steps.',
}

const STEPS = [
  {
    n: '01',
    icon: <IcSearch />,
    accent: '#3b82f6',
    bg: '#eff6ff',
    title: 'Paste the job description',
    desc: 'Copy any Upwork job posting URL or description text and paste it into RelateEdge. Our AI instantly parses the requirements, scope, budget, and client history.',
    details: [
      'Auto-detects job category & skills needed',
      'Pulls client spending history & rating',
      'Identifies budget range & project type',
      'Flags deadline urgency automatically',
    ],
  },
  {
    n: '02',
    icon: <IcTarget />,
    accent: '#d97706',
    bg: '#fef3c7',
    title: 'AI analyzes & scores the job',
    desc: 'Before you write a word, RelateEdge tells you if the job is worth your time. Get a comprehensive breakdown of win probability, client quality, and potential red flags.',
    details: [
      'Win chance prediction (% probability)',
      'Client quality score (5-star rating)',
      'Red flag detection (scope creep, low budget)',
      'Category competition analysis',
    ],
  },
  {
    n: '03',
    icon: <IcPen />,
    accent: '#4F46E5',
    bg: '#eef2ff',
    title: 'Generate a killer proposal',
    desc: 'AI generates a personalized proposal with a high-converting hook, social proof section, and clear CTA — tailored specifically to the job and client.',
    details: [
      'Personalized opening hook',
      'Relevant portfolio & proof points',
      'Clear call-to-action & availability',
      'Tone matching to client style',
    ],
  },
  {
    n: '04',
    icon: <IcChart />,
    accent: '#059669',
    bg: '#f0fdf4',
    title: 'Score & optimize',
    desc: 'Every proposal gets a quality score out of 100. See exactly what\'s strong and what needs improvement — hook strength, personalization, clarity, and specificity.',
    details: [
      'Overall score with breakdown',
      'Hook strength rating',
      'Personalization depth check',
      'Actionable improvement tips',
    ],
  },
  {
    n: '05',
    icon: <IcRocket />,
    accent: '#7C3AED',
    bg: '#ede9fe',
    title: 'Copy, send & track',
    desc: 'One-click copy your finalized proposal. Send it on Upwork, then track whether you got a reply. Build your personal win-rate data over time.',
    details: [
      'One-click copy to clipboard',
      'Per-proposal reply tracking',
      'Historical win rate analytics',
      'A/B test different hooks',
    ],
  },
]

const FAQS = [
  {
    q: 'How long does it take to generate a proposal?',
    a: 'Under 10 seconds. Paste the job description, and you\'ll have a scored, ready-to-send proposal almost instantly.',
  },
  {
    q: 'Does it work for any Upwork job category?',
    a: 'Yes. RelateEdge works for development, design, writing, marketing, VA work, and every other Upwork category.',
  },
  {
    q: 'Is my data stored or shared?',
    a: 'Never. Your proposals and job data are only used during generation. We don\'t store or share your information.',
  },
  {
    q: 'Can I customize the proposal tone?',
    a: 'Absolutely. You can set your preferred tone (professional, casual, technical) and RelateEdge adapts accordingly.',
  },
]

export default function HowItWorks() {
  return (
    <main style={{ position: 'relative' }}>
      <section className="max-w-[1060px] mx-auto px-6 xl:px-0" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', fontWeight: 600, color: '#4F46E5',
            padding: '4px 12px', borderRadius: '999px',
            border: '1px solid rgba(79,70,229,0.18)',
            background: 'rgba(79,70,229,0.05)',
            marginBottom: '20px',
          }}>
            <span style={{ width: '12px', height: '12px', color: '#4F46E5' }}><IcSparkle /></span>
            How it works
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#0f172a', lineHeight: 1.1, marginBottom: '20px',
          }}>
            From job post to winning<br />
            <span style={{
              background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>proposal in seconds</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 36px' }}>
            RelateEdge automates the entire proposal workflow — analysis, writing, scoring, and tracking — so you can focus on the work, not the pitch.
          </p>

          <ButtonLink href="/proposal/new" variant="primary">Try it free →</ButtonLink>
        </div>
      </section>
      <section className="max-w-[900px] mx-auto px-6 xl:px-0 py-16">
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '31px', top: '0', bottom: '0',
            width: '2px',
            background: 'linear-gradient(180deg, #4F46E5 0%, #7C3AED 50%, #059669 100%)',
            opacity: 0.12,
          }} />

          {STEPS.map((step, i) => (
            <div key={step.n} style={{
              display: 'flex', gap: '32px',
              marginBottom: i < STEPS.length - 1 ? '56px' : '0',
              position: 'relative',
            }}>
              {/* Step indicator */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '18px',
                  background: step.bg,
                  border: `1.5px solid ${step.accent}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step.accent,
                  boxShadow: `0 4px 16px ${step.accent}12`,
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ width: '28px', height: '28px' }}>{step.icon}</div>
                </div>
              </div>

              {/* Content card */}
              <div style={{
                flex: 1, background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '20px', padding: '28px 32px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
              }}>
                {/* Step number */}
                <div style={{
                  fontSize: '11px', fontWeight: 700, color: step.accent,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}>
                  Step {step.n}
                </div>

                <h3 style={{
                  fontSize: '22px', fontWeight: 800, color: '#0f172a',
                  letterSpacing: '-0.02em', marginBottom: '10px',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '15px', color: '#64748b', lineHeight: 1.7,
                  marginBottom: '20px',
                }}>
                  {step.desc}
                </p>

                {/* Detail bullets */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                }}>
                  {step.details.map((d) => (
                    <div key={d} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '13px', color: '#475569',
                    }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: step.accent, flexShrink: 0,
                      }} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: '#f8f9ff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="max-w-[760px] mx-auto px-6 xl:px-0 py-24">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Frequently asked questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq) => (
              <div key={faq.q} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px', padding: '20px 24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-[1060px] mx-auto px-6 xl:px-0 py-24">
        <div style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          borderRadius: '24px', padding: '56px 48px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Ready to win more jobs?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              Start generating high-scoring proposals today. No credit card required.
            </p>
            <ButtonLink href="/proposal/new" variant="secondary" style={{ border: 'none', padding: '14px 28px' }}>
              Generate Free Proposal →
            </ButtonLink>
          </div>
        </div>
      </section>

    </main>
  )
}
