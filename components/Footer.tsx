import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] pt-20 pb-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 xl:px-0">

        <div className="flex flex-wrap gap-16 justify-between mb-20">

          <div className="flex-[1_1_300px]">
            <div className="flex items-center gap-2 text-slate-900 mb-4">
            <Link href="/" className="flex items-center">
            <Image
              src="/icons/logo.svg"
              alt="RelateEdge logo"
              width={100}
              height={100}
              className="w-6 h-6"
            />
          </Link>
            </div>
            <p className="text-[15px] text-slate-500 leading-[1.7] mb-6 max-w-[320px]">
              The premium proposal engine for modern freelancers. Generate high-converting copy, score your results, and track performance.
            </p>
          </div>

          <div className="grid gap-12 flex-[2_1_500px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>

            {[
              {
                title: 'Product',
                links: [
                  { label: 'How it works',  href: '/how-it-works', component: Link },
                  { label: 'Pricing',       href: '/pricing',      component: Link },
                  { label: 'Live Demo',     href: '/#',            component: Link },
                ],
              },
              {
                title: 'For Devs',
                links: [
                  { label: 'API Docs',          href: '/docs', component: Link },
                  { label: 'GitHub Repository', href: '#',     component: 'a' },
                  { label: 'Integrations',      href: '#',     component: 'a' },
                ],
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy Policy',    href: '/privacy', component: Link },
                  { label: 'Terms of Service',  href: '/terms',   component: Link },
                  { label: 'Cookie Guidelines', href: '/cookie',  component: Link },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-[13px] font-bold text-slate-900 uppercase tracking-[0.05em] mb-5">{title}</h4>
                <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
                  {links.map(({ label, href, component: Comp }) => (
                    <li key={label}>
                      <Comp
                        href={href}
                        className="text-sm text-slate-500 no-underline transition-all duration-200 hover:text-indigo-600 hover:translate-x-1 inline-block"
                      >
                        {label}
                      </Comp>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-black/[0.06] flex-wrap gap-4">
          <div className="text-[13px] text-slate-400">
            © {new Date().getFullYear()} RELATEEDGE AI. PRECISION ENGINEERING.
          </div>
          <div className="flex gap-5">
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