'use client'

import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import type { CSSProperties } from 'react'
import {
  IcChart, IcTarget, IcZap, IcStar, IcMessageSquare,
  IcDollar, IcShield, IcBrain, IcSparkle, IcClock,
} from './Icons'

const BASE_SIZE = 560
const MOBILE_ORBIT_WIDTH_TRIM = 20

function SvgRing({
  radius,
  s,
  strokeWidth = 1,
  dashed = false,
  opacity = 0.12,
  spin = false,
  spinDuration = 60,
  reverse = false,
}: {
  radius: number
  s: number
  strokeWidth?: number
  dashed?: boolean
  opacity?: number
  spin?: boolean
  spinDuration?: number
  reverse?: boolean
}) {
  const r = radius * s
  const sw = Math.max(0.75, strokeWidth * s)
  const size = r * 2 + sw * 2
  const animStyle: CSSProperties = spin
    ? { animation: `${reverse ? 'orbitFwdR' : 'orbitFwd'} ${spinDuration}s linear infinite` }
    : {}

  return (
    <svg
      width={size}
      height={size}
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{ transform: 'translate(-50%, -50%)', ...animStyle }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`rgba(79,70,229,${opacity})`}
        strokeWidth={sw}
        strokeDasharray={dashed ? `${6 * s} ${8 * s}` : 'none'}
      />
    </svg>
  )
}

function OrbitItem({
  radius,
  s,
  duration,
  delay = 0,
  reverse = false,
  children,
}: {
  radius: number
  s: number
  duration: number
  delay?: number
  reverse?: boolean
  children: React.ReactNode
}) {
  const dir = reverse ? 'orbitFwdR' : 'orbitFwd'
  const counter = reverse ? 'orbitFwd' : 'orbitRev'
  const left = radius * s

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0"
      style={{ animation: `${dir} ${duration}s linear infinite ${delay}s` }}
    >
      <div
        className="absolute"
        style={{
          left: `${left}px`,
          top: '-50%',
          transform: 'translateY(-50%)',
          animation: `${counter} ${duration}s linear infinite ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Pill({
  children,
  s,
  glowColor = 'rgba(79,70,229,0.06)',
}: {
  children: React.ReactNode
  s: number
  glowColor?: string
}) {
  return (
    <div
      className="inline-flex items-center bg-white/95 backdrop-blur-md border border-black/[0.06] rounded-full font-semibold text-slate-900 whitespace-nowrap"
      style={{
        gap: 6 * s,
        paddingLeft: 12 * s,
        paddingRight: 12 * s,
        paddingTop: 6 * s,
        paddingBottom: 6 * s,
        fontSize: Math.max(10, 12 * s),
        boxShadow: `0 ${4 * s}px ${16 * s}px ${glowColor}`,
      }}
    >
      {children}
    </div>
  )
}

function IconBox({
  icon,
  color,
  bg,
  size = 32,
}: {
  icon: React.ReactNode
  color: string
  bg: string
  size?: number
}) {
  return (
    <div
      className="flex items-center justify-center border border-black/5"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        background: bg,
        color,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ width: size * 0.5, height: size * 0.5 }}>{icon}</div>
    </div>
  )
}

function Particle({
  radius,
  s,
  duration,
  delay = 0,
  reverse = false,
  size = 4,
  color = 'rgba(79,70,229,0.2)',
}: {
  radius: number
  s: number
  duration: number
  delay?: number
  reverse?: boolean
  size?: number
  color?: string
}) {
  const sz = Math.max(2, size * s)
  return (
    <OrbitItem radius={radius} s={s} duration={duration} delay={delay} reverse={reverse}>
      <div
        style={{
          width: sz,
          height: sz,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 ${sz}px ${color}`,
        }}
      />
    </OrbitItem>
  )
}

function iconWrap(s: number, dim = 16) {
  const d = dim * s
  return { width: d, height: d, flexShrink: 0 as const }
}

export default function HeroOrbit() {
  const [visible, setVisible] = useState(false)
  const [s, setS] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 250)
    return () => clearTimeout(t)
  }, [])

  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const mq = window.matchMedia('(max-width: 1279px)')

    const measure = () => {
      let width = el.getBoundingClientRect().width
      if (mq.matches) width = Math.max(80, width - MOBILE_ORBIT_WIDTH_TRIM)
      setS(Math.min(1, width / BASE_SIZE))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    mq.addEventListener('change', measure)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', measure)
    }
  }, [])

  const R1 = 80,
    R2 = 140,
    R3 = 200,
    R4 = 258
  const size = BASE_SIZE * s

  const orb = 92 * s
  const halo1 = 116 * s
  const halo2 = 140 * s
  const glow = 360 * s
  const spark = 34 * s

  return (
    <div ref={wrapperRef} className="flex w-full min-w-0 justify-center overflow-clip">
      <div
        className="relative select-none"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            width: glow,
            height: glow,
            background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
          }}
        />

        <SvgRing radius={R1} s={s} opacity={0.1} />
        <SvgRing radius={R2} s={s} dashed opacity={0.08} spin spinDuration={80} />
        <SvgRing radius={R3} s={s} opacity={0.07} />
        <SvgRing radius={R4} s={s} dashed opacity={0.06} spin spinDuration={100} reverse />

        <div
          className="absolute top-1/2 left-1/2 z-[3] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white"
          style={{
            width: orb,
            height: orb,
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #a855f7 100%)',
            boxShadow: `0 0 0 ${12 * s}px rgba(79,70,229,0.07), 0 0 ${50 * s}px rgba(79,70,229,0.25)`,
          }}
        >
          <div style={{ width: spark, height: spark }}>
            <IcSparkle />
          </div>
        </div>

        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/15"
          style={{ width: halo1, height: halo1 }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/5"
          style={{ width: halo2, height: halo2 }}
        />

        <Particle radius={R1} s={s} duration={8} delay={0} size={4} />
        <Particle radius={R2} s={s} duration={12} delay={-4} size={3} />
        <Particle radius={R3} s={s} duration={18} delay={-9} size={4} reverse />
        <Particle radius={R4} s={s} duration={24} delay={-6} size={3} />
        <Particle radius={R4} s={s} duration={24} delay={-18} size={4} reverse />

        <OrbitItem radius={R1} s={s} duration={8} delay={0}>
          <Pill s={s}>
            <div className="flex items-center justify-center text-indigo-600" style={iconWrap(s, 16)}>
              <IcChart />
            </div>
            <span className="text-indigo-600">87</span>
            <span className="font-normal text-slate-400">/100</span>
          </Pill>
        </OrbitItem>

        <OrbitItem radius={R2} s={s} duration={12} delay={0}>
          <Pill s={s}>
            <div className="flex items-center justify-center text-emerald-600" style={iconWrap(s, 16)}>
              <IcTarget />
            </div>
            <span className="text-emerald-600">73%</span>
            <span className="text-[11px] font-normal text-slate-500" style={{ fontSize: Math.max(9, 11 * s) }}>
              win
            </span>
          </Pill>
        </OrbitItem>

        <OrbitItem radius={R2} s={s} duration={12} delay={-4}>
          <Pill s={s} glowColor="rgba(245,158,11,0.08)">
            <div className="flex items-center justify-center text-amber-600" style={iconWrap(s, 14)}>
              <IcStar />
            </div>
            <span>9.2</span>
            <span className="font-normal text-slate-400" style={{ fontSize: Math.max(9, 11 * s) }}>
              hook
            </span>
          </Pill>
        </OrbitItem>

        <OrbitItem radius={R2} s={s} duration={12} delay={-8}>
          <IconBox icon={<IcBrain />} color="#7C3AED" bg="rgba(237,233,254,0.95)" size={30 * s} />
        </OrbitItem>

        <OrbitItem radius={R3} s={s} duration={18} delay={0} reverse>
          <Pill s={s}>
            <div className="flex items-center justify-center text-indigo-600" style={iconWrap(s, 14)}>
              <IcMessageSquare />
            </div>
            <span>68% reply</span>
          </Pill>
        </OrbitItem>

        <OrbitItem radius={R3} s={s} duration={18} delay={-6} reverse>
          <Pill s={s} glowColor="rgba(225,29,72,0.06)">
            <div className="flex items-center justify-center text-rose-600" style={iconWrap(s, 14)}>
              <IcZap />
            </div>
            <span>2h reply</span>
          </Pill>
        </OrbitItem>

        <OrbitItem radius={R3} s={s} duration={18} delay={-12} reverse>
          <Pill s={s} glowColor="rgba(5,150,105,0.06)">
            <div className="flex items-center justify-center text-emerald-600" style={iconWrap(s, 14)}>
              <IcDollar />
            </div>
            <span>$1.2M</span>
          </Pill>
        </OrbitItem>

        <OrbitItem radius={R4} s={s} duration={24} delay={0}>
          <IconBox icon={<IcClock />} color="#64748b" bg="rgba(241,245,249,0.95)" size={34 * s} />
        </OrbitItem>

        <OrbitItem radius={R4} s={s} duration={24} delay={-8}>
          <IconBox icon={<IcShield />} color="#059669" bg="rgba(236,253,245,0.95)" size={32 * s} />
        </OrbitItem>

        <OrbitItem radius={R4} s={s} duration={24} delay={-16}>
          <IconBox icon={<IcChart />} color="#7C3AED" bg="rgba(237,233,254,0.95)" size={30 * s} />
        </OrbitItem>
      </div>
    </div>
  )
}
