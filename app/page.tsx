'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import HeroOrbit from '@/components/HeroOrbit'
import ButtonLink from '@/components/Button'
import StackingCards from '@/components/StackingCards'
import LogoCarousel from '@/components/LogoCarousel'
import { IcSparkle } from '@/components/Icons'
import { useWaitlist } from '@/components/waitlist/WaitlistContext'

export default function Home() {
  const { open } = useWaitlist()

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.12
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative">

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full blur-[60px] animate-pulse bg-[radial-gradient(circle,rgba(79,70,229,0.09)_0%,transparent_70%)]" />
        <div className="absolute top-10 -right-24 w-[500px] h-[500px] rounded-full blur-[60px] animate-pulse bg-[radial-gradient(circle,rgba(113,112,182,0.1)_0%,transparent_70%)]" />
      </div>

      <section
        data-reveal
        className="max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-0 pt-20 pb-20  sm:pb-28 relative z-10"
      >
        <div className="reveal">
          <div className="flex flex-col items-center gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-12">

          <div className="w-full max-w-[568px] shrink-0 xl:w-[48%]">

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 mb-6">
              <span className="w-3 h-3 text-indigo-600"><IcSparkle /></span>
              Built for Upwork freelancers
            </div>

            <h1 className="text-[clamp(40px,4.5vw,60px)] leading-[1.07] font-extrabold tracking-[-0.03em] mb-5">
              <span className="text-slate-900">
                Write proposals<br />that actually<br />
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%] bg-clip-text text-transparent animate-[gradientShift_3s_linear_infinite]">
                get replies.
              </span>
            </h1>

            <p className="text-[17px] leading-7 text-slate-500 mb-8">
              Paste any job description. Get a personalized proposal in seconds — not a template.
              <span className="text-slate-700 font-medium"> A message that converts.</span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink variant="primary" onClick={open}>
                Join to whitelist →
              </ButtonLink>
              <Link href="#features" className="cursor-pointer text-center text-sm font-medium text-slate-500 hover:text-slate-800 transition sm:text-left">
                See how it works ↗
              </Link>
            </div>

            <div className="mt-10 flex flex-nowrap items-start justify-between gap-2 border-t border-black/10 pt-6 sm:gap-5 md:gap-8">
              {[
                { value: '2,400+', label: 'proposals generated' },
                { value: '68%', label: 'avg. reply rate' },
                { value: 'Coming soon', label: 'Plans & pricing' },
              ].map((s, i) => (
                <div key={i} className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="text-[clamp(0.9375rem,3.2vw,1.375rem)] font-extrabold leading-tight tracking-tight text-slate-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] font-medium leading-snug text-slate-400 sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full max-w-[min(100%,520px)] relative shrink-0 justify-center xl:w-[48%]">
            <HeroOrbit />
          </div>
          </div>
        </div>
      </section>

      <section data-reveal className="border-y border-black/5 bg-slate-50/50 relative z-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-0 pt-6">
          <div className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            Trusted by freelancers on
          </div>
          <LogoCarousel />
        </div>
      </section>

      <section data-reveal id="features" className="max-w-[1060px] mx-auto px-4 sm:px-6 xl:px-0 py-16 sm:py-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 mb-4">
            <span className="w-3 h-3 text-indigo-600"><IcSparkle /></span>
            Features
          </div>
          <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-slate-900 tracking-tight mb-3">
            Everything you need to win on Upwork
          </h2>
          <p className="text-[17px] text-slate-500 max-w-md mx-auto leading-6">
            From raw job post to winning proposal — RelateEdge handles the whole flow.
          </p>
        </div>

        <StackingCards />
      </section>

      <section
        data-reveal
        className="max-w-[1060px] mx-auto px-4 sm:px-6 xl:px-0 py-16 sm:py-24 border-t border-black/5"
      >
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 mb-4">
            <span className="w-3 h-3 text-indigo-600"><IcSparkle /></span>
            Compare
          </div>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold text-slate-900 tracking-tight mb-3">
            Writing & bidding manually vs with RelateEdge
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-500 max-w-lg mx-auto leading-relaxed">
            Same job post — different workflow. See where time and quality diverge.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {[
            {
              area: 'Time per proposal & bid prep',
              manual: 'Often 30–60+ minutes of reading, drafting, and tweaking.',
              us: 'Minutes from paste to a scored, ready-to-send draft.',
            },
            {
              area: 'Understanding the client & job',
              manual: 'Skim the post, guess red flags, easy to miss scope creep.',
              us: 'Structured read on fit, budget signals, and risk before you write.',
            },
            {
              area: 'Hook & personalization',
              manual: 'Templates and recycled openers; sounds like everyone else.',
              us: 'Opening tailored to the post and pain points, not generic fluff.',
            },
            {
              area: 'Bid price & positioning',
              manual: 'Spreadsheet guesses or gut feel; hard to stay consistent.',
              us: 'Clearer basis to price confidently when you lean on analysis signals.',
            },
            {
              area: 'Iteration & quality check',
              manual: 'Self-edit until tired; no objective score before you send.',
              us: 'Quality score plus concrete fixes before you hit send.',
            },
            {
              area: 'Tracking what works',
              manual: 'Notes, memory, or messy docs — patterns get lost.',
              us: 'History and signals so you can double down on what wins.',
            },
          ].map((row) => (
            <div
              key={row.area}
              className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-5"
            >
              <div className="mb-3 flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(79,70,229,0.12)]"
                  aria-hidden
                />
                <h3 className="text-left text-[15px] font-extrabold leading-snug tracking-tight text-slate-900 sm:text-base">
                  {row.area}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="flex min-h-0 flex-col rounded-xl border border-slate-200/90 bg-slate-50/90 p-3 sm:p-4">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Manual
                  </span>
                  <p className="text-left text-[13px] leading-relaxed text-slate-600 sm:text-sm">{row.manual}</p>
                </div>
                <div className="flex min-h-0 flex-col rounded-xl border border-indigo-200/70 bg-gradient-to-b from-indigo-50/95 to-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:p-4">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600">
                    RelateEdge
                  </span>
                  <p className="text-left text-[13px] leading-relaxed text-slate-800 sm:text-sm">{row.us}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="bg-[#0a0f1c] border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.1)_0%,transparent_70%)]" />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 xl:px-0 py-20 sm:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-16">

            {["Sync Job","AI Draft","Score & Send"].map((title, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-10 -left-5 text-[110px] font-black text-white/5">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                <p className="text-[15px] text-slate-400 leading-7">
                  Copy and paste the job description or sync directly. We extract the core requirements automatically.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section data-reveal className="border-t border-black/10 py-16 sm:py-28">
        <div className="max-w-[1060px] mx-auto px-4 sm:px-6 xl:px-0 grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">

          <div>
            <h2 className="text-[clamp(32px,4vw,42px)] font-extrabold text-slate-900 leading-tight mb-6">
              Invest in your<br/>career growth.
            </h2>
            <p className="text-base text-slate-500 mb-8 max-w-sm">
              Join 6,000+ freelancers who have doubled their conversion rates.
            </p>

            <div className="flex flex-col gap-4">
              {[
                'Unlimited AI-Generated Proposals',
                'Advanced Proposal Analytics',
                '24/7 Priority AI Coaching'
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl border border-black/10 bg-white p-8 shadow-xl sm:p-12">
            <div className="absolute top-6 right-6 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest mb-4">
              Professional Plan
            </div>

            <div className="mb-6">
              <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Coming soon
              </span>
              <p className="mt-2 text-sm text-slate-500">Pricing will be announced with public launch.</p>
            </div>

            <p className="text-sm text-slate-500 mb-8">
              Everything you need to turn proposal writing into your greatest advantage.
            </p>

            <ButtonLink
              variant="primary"
              className="w-full text-center py-4 shadow-lg"
              onClick={open}
            >
              Join to whitelist →
            </ButtonLink>

            <div className="text-center text-xs text-slate-400 mt-4">
              No credit card required.
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}