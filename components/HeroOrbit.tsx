'use client'

import { useEffect, useState } from 'react'
import {
  IcChart, IcTarget, IcZap, IcStar, IcMessageSquare,
  IcDollar, IcShield, IcBrain, IcSparkle, IcClock,
} from './Icons'
// SVG Orbit Ring
function SvgRing({
  radius,
  strokeWidth = 1,
  dashed = false,
  opacity = 0.12,
  spin = false,
  spinDuration = 60,
  reverse = false,
}: {
  radius: number; strokeWidth?: number; dashed?: boolean
  opacity?: number; spin?: boolean; spinDuration?: number
  reverse?: boolean
}) {
  const size = radius * 2 + strokeWidth * 2
  const animStyle: React.CSSProperties = spin
    ? {
        animation: `${reverse ? 'orbitFwdR' : 'orbitFwd'} ${spinDuration}s linear infinite`,
      }
    : {}

  return (
    <svg
      width={size} height={size}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%)`,
        pointerEvents: 'none',
        ...animStyle,
      }}
    >
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={`rgba(79,70,229,${opacity})`}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? '6 8' : 'none'}
      />
    </svg>
  )
}
// Orbit item — positions child on a circular path
function OrbitItem({
  radius, duration, delay = 0, reverse = false, children,
}: {
  radius: number; duration: number; delay?: number
  reverse?: boolean; children: React.ReactNode
}) {
  const dir = reverse ? 'orbitFwdR' : 'orbitFwd'
  const counter = reverse ? 'orbitFwd' : 'orbitRev'

  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      width: 0, height: 0,
      // Use negative delay to space items out immediately without waiting
      animation: `${dir} ${duration}s linear infinite ${delay}s`,
    }}>
      <div style={{
        position: 'absolute',
        left: `${radius}px`,
        top: '-50%',
        transform: 'translateY(-50%)',
        animation: `${counter} ${duration}s linear infinite ${delay}s`,
      }}>
        {children}
      </div>
    </div>
  )
}
function Pill({
  children, glowColor = 'rgba(79,70,229,0.06)'
}: {
  children: React.ReactNode; glowColor?: string
}) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: '99px', padding: '6px 12px',
      fontSize: '12px', fontWeight: 600, color: '#0f172a',
      boxShadow: `0 4px 16px ${glowColor}`,
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </div>
  )
}
function IconBox({
  icon, color, bg, size = 32,
}: {
  icon: React.ReactNode; color: string; bg: string; size?: number
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: bg,
      border: '1px solid rgba(0,0,0,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <div style={{ width: size * 0.5, height: size * 0.5 }}>{icon}</div>
    </div>
  )
}
function Particle({
  radius, duration, delay = 0, reverse = false,
  size = 4, color = 'rgba(79,70,229,0.2)',
}: {
  radius: number; duration: number; delay?: number; reverse?: boolean
  size?: number; color?: string
}) {
  return (
    <OrbitItem radius={radius} duration={duration} delay={delay} reverse={reverse}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }} />
    </OrbitItem>
  )
}
export default function HeroOrbit() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 250)
    return () => clearTimeout(t)
  }, [])

  const R1 = 80, R2 = 140, R3 = 200, R4 = 258

  return (
    <div
      className="no-select"
      style={{
        position: 'relative',
        width: '560px', height: '560px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transition: 'opacity 1s ease, transform 1s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '360px', height: '360px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <SvgRing radius={R1} opacity={0.1} />
      <SvgRing radius={R2} dashed opacity={0.08} spin spinDuration={80} />
      <SvgRing radius={R3} opacity={0.07} />
      <SvgRing radius={R4} dashed opacity={0.06} spin spinDuration={100} reverse />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '92px', height: '92px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #a855f7 100%)',
        boxShadow: '0 0 0 12px rgba(79,70,229,0.07), 0 0 50px rgba(79,70,229,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', zIndex: 3,
      }}>
        <div style={{ width: '34px', height: '34px' }}>
          <IcSparkle />
        </div>
      </div>

      {/* Halo rings */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '116px', height: '116px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: `1.5px solid rgba(79,70,229,0.15)`,
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '140px', height: '140px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: `1px solid rgba(79,70,229,0.05)`,
        pointerEvents: 'none', zIndex: 2,
      }} />
      {/* Small dots moving along rings. Delay corresponds to rotation start pos */}
      <Particle radius={R1} duration={8} delay={0} size={4} />
      <Particle radius={R2} duration={12} delay={-4} size={3} />
      <Particle radius={R3} duration={18} delay={-9} size={4} reverse />
      <Particle radius={R4} duration={24} delay={-6} size={3} />
      <Particle radius={R4} duration={24} delay={-18} size={4} reverse />
      {/* 1 item -> any delay is fine */}
      <OrbitItem radius={R1} duration={8} delay={0}>
        <Pill>
          <div style={{ width: '16px', height: '16px', color: '#4F46E5' }}><IcChart /></div>
          <span style={{ color: '#4F46E5' }}>87</span>
          <span style={{ color: '#94a3b8', fontWeight: 400 }}>/100</span>
        </Pill>
      </OrbitItem>
      {/* Duration 12s -> Delays spaced by 4s: 0, -4, -8 */}
      <OrbitItem radius={R2} duration={12} delay={0}>
        <Pill>
          <div style={{ width: '16px', height: '16px', color: '#059669' }}><IcTarget /></div>
          <span style={{ color: '#059669' }}>73%</span>
          <span style={{ color: '#64748b', fontWeight: 400, fontSize: '11px' }}>win</span>
        </Pill>
      </OrbitItem>

      <OrbitItem radius={R2} duration={12} delay={-4}>
        <Pill glowColor="rgba(245,158,11,0.08)">
          <div style={{ width: '14px', height: '14px', color: '#d97706' }}><IcStar /></div>
          <span>9.2</span>
          <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '11px' }}>hook</span>
        </Pill>
      </OrbitItem>

      <OrbitItem radius={R2} duration={12} delay={-8}>
        <IconBox icon={<IcBrain />} color="#7C3AED" bg="rgba(237,233,254,0.95)" size={30} />
      </OrbitItem>
      {/* Duration 18s -> Delays spaced by 6s: 0, -6, -12. Reverse direction */}
      <OrbitItem radius={R3} duration={18} delay={0} reverse>
        <Pill>
          <div style={{ width: '14px', height: '14px', color: '#4F46E5' }}><IcMessageSquare /></div>
          <span>68% reply</span>
        </Pill>
      </OrbitItem>

      <OrbitItem radius={R3} duration={18} delay={-6} reverse>
        <Pill glowColor="rgba(225,29,72,0.06)">
          <div style={{ width: '14px', height: '14px', color: '#e11d48' }}><IcZap /></div>
          <span>2h reply</span>
        </Pill>
      </OrbitItem>

      <OrbitItem radius={R3} duration={18} delay={-12} reverse>
        <Pill glowColor="rgba(5,150,105,0.06)">
          <div style={{ width: '14px', height: '14px', color: '#059669' }}><IcDollar /></div>
          <span>$1.2M</span>
        </Pill>
      </OrbitItem>
      {/* Duration 24s -> Delays spaced by 8s: 0, -8, -16 */}
      <OrbitItem radius={R4} duration={24} delay={0}>
        <IconBox icon={<IcClock />} color="#64748b" bg="rgba(241,245,249,0.95)" size={34} />
      </OrbitItem>

      <OrbitItem radius={R4} duration={24} delay={-8}>
        <IconBox icon={<IcShield />} color="#059669" bg="rgba(236,253,245,0.95)" size={32} />
      </OrbitItem>

      <OrbitItem radius={R4} duration={24} delay={-16}>
        <IconBox icon={<IcChart />} color="#7C3AED" bg="rgba(237,233,254,0.95)" size={30} />
      </OrbitItem>
    </div>
  )
}
