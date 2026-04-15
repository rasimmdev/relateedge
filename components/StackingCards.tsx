'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import {
  IcSearch, IcPen, IcChart, IcRocket, IcTarget, IcShield,
} from './Icons'
const CARDS = [
  {
    icon: <IcSearch />,
    accent: '#3b82f6',
    title: 'Analyze any job instantly',
    desc: 'Understand client quality, win chance, budget signals, and red flags — before you spend a second writing.',
    tags: ['Client score', 'Win chance', 'Red flags'],
    stat: { label: 'Avg analysis time', value: '< 3s' },
  },
  {
    icon: <IcPen />,
    accent: '#4F46E5',
    title: 'Generate proposals that convert',
    desc: 'AI crafts a personalized, structured proposal with a hook that speaks directly to the client\'s pain — not a template.',
    tags: ['Hook', 'Proof', 'CTA'],
    stat: { label: 'Avg hook score', value: '9.2' },
  },
  {
    icon: <IcChart />,
    accent: '#059669',
    title: 'Track what wins',
    desc: 'Log every proposal, see your reply rate, and get insights on what hooks and formats actually get responses.',
    tags: ['Reply rate', 'A/B insights', 'History'],
    stat: { label: 'Reply rate boost', value: '+42%' },
  },
  {
    icon: <IcTarget />,
    accent: '#d97706',
    title: 'Score before you send',
    desc: 'Get a real-time quality score with actionable tips to improve your proposal before hitting send.',
    tags: ['Real-time score', 'Tips', 'Optimization'],
    stat: { label: 'Top proposals', value: '15%' },
  },
  {
    icon: <IcShield />,
    accent: '#db2777',
    title: 'Avoid bad clients',
    desc: 'Red flag detection warns you about problematic jobs — unclear scope, low budgets, or clients with poor histories.',
    tags: ['Red flags', 'Risk score', 'Trust signals'],
    stat: { label: 'Flags detected', value: '3.2K' },
  },
  {
    icon: <IcRocket />,
    accent: '#7C3AED',
    title: 'Win more, write less',
    desc: 'Spend 30 seconds instead of 30 minutes. Generate, score, copy, and send — all in one flow.',
    tags: ['Automation', 'Speed', 'Efficiency'],
    stat: { label: 'Time saved', value: '94%' },
  },
]

const STICKY_TOP = 120
function StackCard({
  card,
  index,
  total,
  onIntersection,
}: {
  card: typeof CARDS[number]
  index: number
  total: number
  onIntersection: (index: number, isIntersecting: boolean) => void
}) {
  const stackOffset = index * 10
  const scale = 1 - (total - 1 - index) * 0.018
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersection(index, entry.isIntersecting)
      },
      {
        rootMargin: `-${STICKY_TOP + stackOffset + 50}px 0px -50% 0px`,
      }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index, onIntersection, stackOffset])

  return (
    <div ref={cardRef} style={{
      position: 'sticky',
      top: `${STICKY_TOP + stackOffset}px`,
      zIndex: index + 1,
      marginBottom: index === total - 1 ? '0px' : '80px',
    }}>
      <div className="stacking-card" style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '24px',
        padding: '40px 44px',
        boxShadow: `0 ${16 + index * 4}px ${32 + index * 8}px rgba(0,0,0,${0.04 + index * 0.008})`,
        transform: `scale(${scale})`,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '-12px', left: '-24px',
          fontSize: '140px',
          fontWeight: 900,
          color: card.accent,
          opacity: 0.04,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {index + 1}
        </div>
        <div style={{
          flexShrink: 0,
          position: 'relative', zIndex: 1,
          width: '48px', height: '48px',
          color: card.accent,
          opacity: 0.7,
        }}>
          <div style={{ width: '48px', height: '48px' }}>
            {card.icon}
          </div>
        </div>
        <div style={{ flex: 1, position: 'relative', zIndex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '22px', fontWeight: 800, color: '#0f172a',
            marginBottom: '8px', letterSpacing: '-0.025em', lineHeight: 1.2,
          }}>
            {card.title}
          </h3>

          <p style={{
            fontSize: '15px', color: '#64748b', lineHeight: 1.7,
            marginBottom: '18px', maxWidth: '460px',
          }}>
            {card.desc}
          </p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
            {card.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: '11px', fontWeight: 600, color: '#94a3b8',
                padding: '4px 10px', borderRadius: '6px',
                border: '1px solid rgba(0,0,0,0.06)',
                background: 'rgba(0,0,0,0.015)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{
          position: 'relative', zIndex: 1,
          flexShrink: 0,
          textAlign: 'right',
          paddingLeft: '24px',
          borderLeft: '1px solid rgba(0,0,0,0.05)',
          minWidth: '120px',
        }}>
          <div style={{
            fontSize: '36px', fontWeight: 900, color: card.accent,
            letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '4px',
          }}>
            {card.stat.value}
          </div>
          <div style={{
            fontSize: '11px', color: '#94a3b8', fontWeight: 500,
            letterSpacing: '0.02em',
          }}>
            {card.stat.label}
          </div>
        </div>
      </div>
    </div>
  )
}
export default function StackingCards() {
  const [intersectingMap, setIntersectingMap] = useState<Record<number, boolean>>({})
  const [maxScrolled, setMaxScrolled] = useState(0)

  const handleIntersection = useMemo(() => (index: number, isIntersecting: boolean) => {
    setIntersectingMap(prev => ({ ...prev, [index]: isIntersecting }))
    if (isIntersecting) {
      setMaxScrolled(prev => Math.max(prev, index))
    }
  }, [])

  
  const activeStep = useMemo(() => {
    let highest = -1;
    for (let i = 0; i < CARDS.length; i++) {
      if (intersectingMap[i]) highest = Math.max(highest, i)
    }
    return highest === -1 ? maxScrolled : highest;
  }, [intersectingMap, maxScrolled])

  return (
    <div style={{ display: 'flex', gap: '0', position: 'relative', alignItems: 'flex-start' }}>
      <div style={{
        position: 'sticky',
        top: `${STICKY_TOP}px`,
        width: '180px',
        flexShrink: 0,
        paddingRight: '32px',
        paddingTop: '8px',
      }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, color: '#4F46E5',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: '24px',
          opacity: 0.6,
        }}>
          Features
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '4px', top: '8px', bottom: '8px',
            width: '1px',
            background: 'rgba(0,0,0,0.06)',
            zIndex: 0,
          }} />

          <div style={{
            position: 'absolute', left: '4px', top: '8px',
            bottom: CARDS.length > 0 ? `calc(100% - ${Math.max(1, (activeStep + 1)) * (100 / CARDS.length)}% + 12px)` : '8px',
            width: '1px',
            background: 'linear-gradient(180deg, #4F46E5, #db2777)',
            transition: 'bottom 0.4s ease',
            zIndex: 1,
          }} />

          {CARDS.map((card, i) => {
            const isActive = i <= activeStep;
            
            return (
              <div key={card.title} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '12px 0',
                position: 'relative',
              }}>
                <div style={{
                  position: 'relative', zIndex: 2, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: isActive ? card.accent : '#f8fafc',
                    border: isActive ? 'none' : '1px solid #cbd5e1',
                    boxShadow: isActive && i === activeStep ? `0 0 0 4px ${card.accent}20` : 'none',
                    transition: 'all 0.3s ease',
                  }} />
                </div>

                <span style={{
                  fontSize: '12px', fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0f172a' : '#94a3b8',
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap' as const,
                  transition: 'color 0.3s ease',
                }}>
                  {card.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: `${(CARDS.length - 1) * 80}px` }}>
        {CARDS.map((card, i) => (
          <StackCard
            key={card.title}
            card={card}
            index={i}
            total={CARDS.length}
            onIntersection={handleIntersection}
          />
        ))}
      </div>
    </div>
  )
}
