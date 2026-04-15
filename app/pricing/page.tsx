import type { Metadata } from 'next'
import Link from 'next/link'
import ButtonLink from '@/components/Button'
import { IcSparkle, IcCheck, IcZap, IcShield } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Pricing — RelateEdge',
  description: 'Simple, transparent pricing. Start free, upgrade when you need more.',
}

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for trying RelateEdge and sending your first proposals.',
    accent: '#64748b',
    iconEl: null,
    cta: 'Get started free',
    ctaVariant: 'secondary' as const,
    features: [
      '5 proposals per month',
      'Job analysis & scoring',
      'Basic proposal generation',
      'Copy to clipboard',
      'Community support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'For serious freelancers who want to maximize their win rate.',
    accent: '#4F46E5',
    iconEl: <IcZap />,
    cta: 'Start Pro trial →',
    ctaVariant: 'primary' as const,
    features: [
      'Unlimited proposals',
      'Advanced job analysis',
      'AI-powered hook optimization',
      'Proposal scoring & tips',
      'Reply rate tracking',
      'A/B hook testing',
      'Priority support',
      'Custom tone settings',
    ],
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    desc: 'For agencies and teams managing multiple freelancer accounts.',
    accent: '#7C3AED',
    iconEl: <IcShield />,
    cta: 'Contact sales',
    ctaVariant: 'secondary' as const,
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Shared proposal templates',
      'Team analytics dashboard',
      'Admin controls',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <main style={{ position: 'relative' }}>
      <section className="max-w-[1060px] mx-auto px-6 xl:px-0" style={{ paddingTop: '80px', paddingBottom: '64px' }}>
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
            Pricing
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#0f172a', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Simple, transparent<br />
            <span style={{
              background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>pricing</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
            Start free. Upgrade when you&apos;re ready. No hidden fees, no surprises.
          </p>
        </div>
      </section>
      <section className="max-w-[1100px] mx-auto px-6 xl:px-0 pb-24">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
          alignItems: 'stretch',
        }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: 'relative',
              background: plan.highlighted
                ? 'linear-gradient(180deg, rgba(79,70,229,0.03) 0%, #fff 40%)'
                : '#fff',
              border: plan.highlighted
                ? '1.5px solid rgba(79,70,229,0.2)'
                : '1px solid rgba(0,0,0,0.06)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex', flexDirection: 'column',
              boxShadow: plan.highlighted
                ? '0 20px 60px rgba(79,70,229,0.1), 0 1px 2px rgba(0,0,0,0.04)'
                : '0 4px 24px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }} className={plan.highlighted ? '' : 'hover:-translate-y-1 hover:shadow-lg'}>

              {/* Popular badge */}
              {plan.highlighted && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '11px', fontWeight: 700, color: '#fff',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  padding: '4px 16px', borderRadius: '99px',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                  whiteSpace: 'nowrap' as const,
                }}>
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  marginBottom: '16px',
                }}>
                  {plan.iconEl && (
                    <div style={{ width: '20px', height: '20px', color: plan.accent, opacity: 0.6 }}>
                      {plan.iconEl}
                    </div>
                  )}
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                    {plan.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '48px', fontWeight: 900, color: '#0f172a',
                    letterSpacing: '-0.04em', lineHeight: 1,
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                    {plan.period}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                  {plan.desc}
                </p>
              </div>

              {/* CTA */}
              <div style={{ marginBottom: '28px' }}>
                {plan.ctaVariant === 'primary' ? (
                  <ButtonLink href="/signup" variant="primary">{plan.cta}</ButtonLink>
                ) : (
                  <Link href={plan.name === 'Team' ? '/contact' : '/signup'} style={{
                    display: 'inline-flex', alignItems: 'center',
                    fontSize: '14px', fontWeight: 600,
                    color: plan.accent,
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: `1px solid ${plan.accent}25`,
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }} className="hover:bg-slate-50">
                    {plan.cta}
                  </Link>
                )}
              </div>

              {/* Divider */}
              <div style={{
                height: '1px', background: 'rgba(0,0,0,0.06)',
                marginBottom: '24px',
              }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    fontSize: '13px', color: '#475569',
                  }}>
                    <div style={{
                      width: '16px', height: '16px', flexShrink: 0,
                      color: plan.highlighted ? '#4F46E5' : '#94a3b8',
                    }}>
                      <IcCheck />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{
          textAlign: 'center', marginTop: '40px',
          fontSize: '13px', color: '#94a3b8',
        }}>
          All plans include a 14-day money-back guarantee. No questions asked.
        </div>
      </section>
      <section style={{ background: '#f8f9ff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800,
              color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px',
            }}>
              Why freelancers choose Pro
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
              The numbers speak for themselves.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
          }}>
            {[
              { value: '68%', label: 'Average reply rate', sub: 'vs 15% industry avg' },
              { value: '94%', label: 'Time saved per proposal', sub: '30min → 30sec' },
              { value: '3.2×', label: 'More interviews won', sub: 'first 30 days' },
            ].map((s) => (
              <div key={s.label} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '20px', padding: '28px', textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  fontSize: '40px', fontWeight: 900,
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {s.sub}
                </div>
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
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800,
              color: '#fff', letterSpacing: '-0.02em', marginBottom: '14px',
            }}>
              Start winning more jobs today
            </h2>
            <p style={{
              fontSize: '16px', color: 'rgba(255,255,255,0.65)',
              marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px',
              lineHeight: 1.6,
            }}>
              Join 2,400+ freelancers already using RelateEdge. No credit card required.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' as const }}>
              <ButtonLink href="/proposal/new" variant="secondary" style={{ border: 'none', padding: '14px 28px' }}>
                Try it free →
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
