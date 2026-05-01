'use client'

import { useEffect, useRef, useState, useMemo, useSyncExternalStore } from 'react'
import {
  IcSearch, IcPen, IcChart, IcTarget, IcShield, IcRocket,
} from './Icons'
import { useLanguage } from './LanguageContext'


function subscribeLg(cb: () => void) {
  const mq = window.matchMedia('(min-width: 1024px)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getLgSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches
}

function useIsLg() {
  return useSyncExternalStore(subscribeLg, getLgSnapshot, () => false)
}

const STICKY_IO_TOP_APPROX = 112

function StackCard({
  card,
  index,
  total,
  stackStep,
  ioTopExtra,
  onIntersection,
}: {
  card: any
  index: number
  total: number
  stackStep: number
  ioTopExtra: number
  onIntersection: (index: number, isIntersecting: boolean) => void
}) {
  const stackOffset = index * stackStep
  const scale = 1 - (total - 1 - index) * 0.018
  const cardRef = useRef<HTMLDivElement>(null)
  const ioTopShrink = STICKY_IO_TOP_APPROX + stackOffset + ioTopExtra + 50

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersection(index, entry.isIntersecting)
      },
      {
        rootMargin: `-${ioTopShrink}px 0px -50% 0px`,
      }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index, ioTopExtra, ioTopShrink, onIntersection])

  return (
    <div
      ref={cardRef}
      className="mb-[72px] last:mb-0 lg:mb-28"
      style={{
        position: 'sticky',
        top: `calc(var(--site-header-h) + 12px + ${stackOffset}px)`,
        zIndex: index + 1,
      }}
    >
      <div
        className="stacking-card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:gap-10 lg:px-11 lg:py-10"
        style={{
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '24px',
          boxShadow: `0 ${16 + index * 4}px ${32 + index * 8}px rgba(0,0,0,${0.04 + index * 0.008})`,
          transform: `scale(${scale})`,
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="pointer-events-none absolute -left-4 -top-3 z-0 select-none text-[clamp(72px,22vw,140px)] font-black leading-none tracking-[-0.05em] opacity-[0.04] sm:-left-6 sm:text-[140px]"
          style={{ color: card.accent }}
        >
          {index + 1}
        </div>
        <div
          className="relative z-[1] h-11 w-11 shrink-0 sm:h-12 sm:w-12"
          style={{ color: card.accent, opacity: 0.7 }}
        >
          {card.icon}
        </div>
        <div className="relative z-[1] min-w-0 flex-1">
          <h3 className="mb-2 text-lg font-extrabold leading-tight tracking-[-0.025em] text-slate-900 sm:text-[22px]">
            {card.title}
          </h3>
          <p className="mb-4 max-w-[460px] text-[15px] leading-relaxed text-slate-600">
            {card.desc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-md border border-black/[0.06] bg-black/[0.015] px-2.5 py-1 text-[11px] font-semibold text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-[1] w-full shrink-0 border-t border-black/5 pt-4 text-left sm:w-auto sm:border-l sm:border-t-0 sm:border-black/5 sm:pl-6 sm:pt-0 sm:text-right">
          <div
            className="text-3xl font-black leading-none tracking-[-0.04em] sm:text-4xl"
            style={{ color: card.accent }}
          >
            {card.stat.value}
          </div>
          <div className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
            {card.stat.label}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturesSteps({
  activeStep,
  variant,
  cards,
}: {
  activeStep: number
  variant: 'sidebar' | 'rail'
  cards: any[]
}) {
  const isRail = variant === 'rail'

  return (
    <div
      className={
        isRail
          ? 'flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'relative'
      }
    >
      {!isRail && (
        <>
          <div
            className="absolute bottom-2 left-1 top-2 z-0 w-px bg-black/[0.06]"
            aria-hidden
          />
          <div
            className="absolute left-1 top-2 z-[1] w-px bg-gradient-to-b from-indigo-600 to-pink-600 transition-[bottom] duration-300 ease-out"
            style={{
              bottom:
                cards.length > 0
                  ? `calc(100% - ${Math.max(1, activeStep + 1) * (100 / cards.length)}% + 12px)`
                  : '8px',
            }}
          />
        </>
      )}
      {cards.map((card, i) => {
        const isActive = i <= activeStep
        return (
          <div
            key={card.title}
            className={
              isRail
                ? 'flex shrink-0 items-center gap-2 rounded-full border border-black/5 bg-white/90 px-3 py-2 pr-4 shadow-sm'
                : 'relative flex items-center gap-3.5 py-3'
            }
          >
            <div className="relative z-[2] flex shrink-0 items-center justify-center">
              <div
                className="h-2 w-2 rounded-full transition-all duration-300 sm:h-[9px] sm:w-[9px]"
                style={{
                  background: isActive ? card.accent : '#f8fafc',
                  border: isActive ? 'none' : '1px solid #cbd5e1',
                  boxShadow:
                    isActive && i === activeStep ? `0 0 0 4px ${card.accent}20` : 'none',
                }}
              />
            </div>
            <span
              className={`max-w-[200px] truncate text-xs transition-colors duration-300 sm:max-w-none ${
                isActive ? 'font-semibold text-slate-900' : 'font-medium text-slate-400'
              }`}
            >
              {card.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function StackingCards() {
  const { t } = useLanguage()

  const CARDS = useMemo(() => [
    {
      icon: <IcSearch />,
      accent: '#3b82f6',
      title: t('cards.card1.title'),
      desc: t('cards.card1.desc'),
      tags: [t('cards.card1.tag1'), t('cards.card1.tag2'), t('cards.card1.tag3')],
      stat: { label: t('cards.card1.statLabel'), value: '< 3s' },
    },
    {
      icon: <IcPen />,
      accent: '#4F46E5',
      title: t('cards.card2.title'),
      desc: t('cards.card2.desc'),
      tags: [t('cards.card2.tag1'), t('cards.card2.tag2'), t('cards.card2.tag3')],
      stat: { label: t('cards.card2.statLabel'), value: '9.2' },
    },
    {
      icon: <IcChart />,
      accent: '#059669',
      title: t('cards.card3.title'),
      desc: t('cards.card3.desc'),
      tags: [t('cards.card3.tag1'), t('cards.card3.tag2'), t('cards.card3.tag3')],
      stat: { label: t('cards.card3.statLabel'), value: '+42%' },
    },
    {
      icon: <IcTarget />,
      accent: '#d97706',
      title: t('cards.card4.title'),
      desc: t('cards.card4.desc'),
      tags: [t('cards.card4.tag1'), t('cards.card4.tag2'), t('cards.card4.tag3')],
      stat: { label: t('cards.card4.statLabel'), value: '15%' },
    },
    {
      icon: <IcShield />,
      accent: '#db2777',
      title: t('cards.card5.title'),
      desc: t('cards.card5.desc'),
      tags: [t('cards.card5.tag1'), t('cards.card5.tag2'), t('cards.card5.tag3')],
      stat: { label: t('cards.card5.statLabel'), value: '3.2K' },
    },
    {
      icon: <IcRocket />,
      accent: '#7C3AED',
      title: t('cards.card6.title'),
      desc: t('cards.card6.desc'),
      tags: [t('cards.card6.tag1'), t('cards.card6.tag2'), t('cards.card6.tag3')],
      stat: { label: t('cards.card6.statLabel'), value: '94%' },
    },
  ], [t])

  const isLg = useIsLg()
  const stackStep = isLg ? 10 : 8

  const [intersectingMap, setIntersectingMap] = useState<Record<number, boolean>>({})
  const [maxScrolled, setMaxScrolled] = useState(0)

  const handleIntersection = useMemo(
    () => (index: number, isIntersecting: boolean) => {
      setIntersectingMap((prev) => ({ ...prev, [index]: isIntersecting }))
      if (isIntersecting) {
        setMaxScrolled((prev) => Math.max(prev, index))
      }
    },
    []
  )

  const activeStep = useMemo(() => {
    let highest = -1
    for (let i = 0; i < CARDS.length; i++) {
      if (intersectingMap[i]) highest = Math.max(highest, i)
    }
    return highest === -1 ? maxScrolled : highest
  }, [intersectingMap, maxScrolled, CARDS.length])

  const stackGap = isLg ? 112 : 72
  const scrollPad = (CARDS.length - 1) * stackGap
  const ioTopExtra = isLg ? 0 : 28

  return (
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
      <div className="lg:hidden">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-indigo-600/80">
          {t('features.badge')}
        </div>
        <FeaturesSteps activeStep={activeStep} variant="rail" cards={CARDS} />
      </div>

      <div
        className="hidden w-[180px] shrink-0 pr-8 pt-2 lg:block"
        style={{
          position: 'sticky',
          top: 'calc(var(--site-header-h) + 12px)',
        }}
      >
        <div className="mb-6 text-[11px] font-bold uppercase tracking-[0.1em] text-indigo-600 opacity-60">
          {t('features.badge')}
        </div>
        <FeaturesSteps activeStep={activeStep} variant="sidebar" cards={CARDS} />
      </div>

      <div className="min-w-0 flex-1 self-start" style={{ paddingBottom: 100 }}>
        {CARDS.map((card, i) => (
          <StackCard
            key={card.title}
            card={card}
            index={i}
            total={CARDS.length}
            stackStep={stackStep}
            ioTopExtra={ioTopExtra}
            onIntersection={handleIntersection}
          />
        ))}
      </div>
    </div>
  )
}
