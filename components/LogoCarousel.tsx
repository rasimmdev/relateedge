'use client'

const LOGOS = [
  { name: 'Upwork',      svg: <svg height="28" viewBox="0 0 100 28"><text x="0" y="22" fill="currentColor" fontSize="24" fontWeight="800" fontFamily="sans-serif" letterSpacing="-1.5">upwork</text></svg> },
  { name: 'Fiverr',      svg: <svg height="28" viewBox="0 0 80 28"><text x="0" y="22" fill="currentColor" fontSize="24" fontWeight="900" fontFamily="serif" letterSpacing="-0.5">fiverr.</text></svg> },
  { name: 'Toptal',      svg: <svg height="28" viewBox="0 0 90 28"><text x="0" y="22" fill="currentColor" fontSize="24" fontWeight="500" fontFamily="sans-serif" letterSpacing="0">Toptal</text></svg> },
  { name: 'Freelancer',  svg: <svg height="28" viewBox="0 0 120 28"><text x="0" y="22" fill="currentColor" fontSize="22" fontWeight="700" fontFamily="sans-serif" letterSpacing="0">Freelancer</text></svg> },
  { name: 'PeoplePerHour', svg: <svg height="28" viewBox="0 0 150 28"><text x="0" y="22" fill="currentColor" fontSize="22" fontWeight="800" fontFamily="sans-serif" letterSpacing="-1">PeoplePerHour</text></svg> },
  { name: 'Guru',        svg: <svg height="28" viewBox="0 0 60 28"><text x="0" y="22" fill="currentColor" fontSize="24" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">guru</text></svg> },
  { name: '99designs',   svg: <svg height="28" viewBox="0 0 120 28"><text x="0" y="22" fill="currentColor" fontSize="24" fontWeight="600" fontFamily="sans-serif" letterSpacing="-1">99designs</text></svg> },
  { name: 'Contra',      svg: <svg height="28" viewBox="0 0 80 28"><text x="0" y="22" fill="currentColor" fontSize="24" fontWeight="700" fontFamily="sans-serif" letterSpacing="-1">Contra</text></svg> },
]

function LogoItem({ svg }: { svg: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '12px 40px',
      flexShrink: 0,
      color: '#cbd5e1',
      transition: 'color 0.3s ease',
    }}
    className="hover:text-slate-400"
    >
      {svg}
    </div>
  )
}

export default function LogoCarousel() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      padding: '24px 0',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
    }}>
      <div
        className="logo-marquee"
        style={{
          display: 'flex', alignItems: 'center',
          width: 'max-content',
        }}
      >
        {items.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} svg={logo.svg} />
        ))}
      </div>
    </div>
  )
}
