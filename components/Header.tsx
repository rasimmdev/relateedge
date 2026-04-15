import Link from "next/link";
import Image from "next/image";
import ButtonLink from "./Button";

export default function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, padding: '12px 16px 0' }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(0, 0, 0, 0.07)',
        borderRadius: '14px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/icons/logo.svg"
              alt="RelateEdge logo"
              width={100}
              height={100}
              style={{ width: '24px', height: '24px' }}
            />
          </Link>

          <nav style={{ alignItems: 'center', gap: '20px' }} className="hidden md:flex">
            {[
              { label: 'How it works', href: '/how-it-works' },
              { label: 'Pricing',      href: '/pricing' },
              { label: 'Docs',         href: '/docs' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-neutral hover:text-slate-800 transition-colors"
                style={{ fontSize: '14px', fontWeight: 400, textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/login"
            className="hidden md:flex text-neutral hover:text-slate-800 transition-colors"
            style={{ fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
          >
            Login
          </Link>
          <ButtonLink href="/signup" variant="primary">Get Started →</ButtonLink>
        </div>
      </div>
    </header>
  )
}