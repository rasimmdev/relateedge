'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import HeroOrbit from '@/components/HeroOrbit'
import ButtonLink from '@/components/Button'
import StackingCards from '@/components/StackingCards'
import LogoCarousel from '@/components/LogoCarousel'
import HeroJourney from '@/components/HeroJourney'
import { IcSparkle } from '@/components/Icons'
import { useWaitlist } from '@/components/waitlist/WaitlistContext'
import { useLanguage } from '@/components/LanguageContext'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    // Mark below-fold elements as pending (suppresses CSS auto-animation)
    // Above-fold elements will auto-animate via CSS @keyframes
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top >= window.innerHeight) {
        el.classList.add('reveal-pending')
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending')
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '50px'
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
          <div className="flex flex-col items-center gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-12">

          <div className="w-full max-w-[568px] shrink-0 xl:w-[48%]">

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 mb-6">
              <span className="w-3 h-3 text-indigo-600"><IcSparkle /></span>
              {t('hero.badge')}
            </div>

            <h1 className="text-[clamp(40px,4.5vw,60px)] leading-[1.07] font-extrabold tracking-[-0.03em] mb-5">
              <span className="text-slate-900">
                {t('hero.title.part1')}<br />{t('hero.title.part2')}<br />
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%] bg-clip-text text-transparent animate-[gradientShift_3s_linear_infinite]">
                {t('hero.title.part3')}
              </span>
            </h1>

            <p className="text-[17px] leading-7 text-slate-500 mb-8">
              {t('hero.desc.part1')}
              <span className="text-slate-700 font-medium">{t('hero.desc.part2')}</span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink variant="primary" href="/register">
                {t('nav.signup')}
              </ButtonLink>
              <Link href="#features" className="cursor-pointer text-center text-sm font-medium text-slate-500 hover:text-slate-800 transition sm:text-left">
                {t('nav.howItWorks')} ↗
              </Link>
            </div>

            <div className="mt-10 flex flex-nowrap items-start justify-between gap-2 border-t border-black/10 pt-6 sm:gap-5 md:gap-8">
              {[
                { value: '2,400+', label: t('hero.stats.proposals') },
                { value: '68%', label: t('hero.stats.replyRate') },
                { value: t('hero.stats.comingSoon'), label: t('hero.stats.pricing') },
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
      </section>

      <section data-reveal className="border-y border-black/5 bg-slate-50/50 relative z-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-0 pt-6">
          <div className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            {t('hero.trustedBy')}
          </div>
          <LogoCarousel />
        </div>
      </section>

      <section data-reveal id="features" className="max-w-[1060px] mx-auto px-4 sm:px-6 xl:px-0 py-16 sm:py-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 mb-4">
            <span className="w-3 h-3 text-indigo-600"><IcSparkle /></span>
            {t('features.badge')}
          </div>
          <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-slate-900 tracking-tight mb-3">
            {t('features.title')}
          </h2>
          <p className="text-[17px] text-slate-500 max-w-md mx-auto leading-6">
            {t('features.desc')}
          </p>
        </div>

        <StackingCards />
      </section>

      <HeroJourney />

      <section data-reveal className="bg-[#0a0f1c] border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.1)_0%,transparent_70%)]" />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 xl:px-0 py-20 sm:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-16">

            {[
              { title: t('steps.step1.title'), desc: t('steps.step1.desc') },
              { title: t('steps.step2.title'), desc: t('steps.step2.desc') },
              { title: t('steps.step3.title'), desc: t('steps.step3.desc') },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-10 -left-5 text-[110px] font-black text-white/5">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-[15px] text-slate-400 leading-7">
                  {step.desc}
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
              {t('cta.title.part1')}<br/>{t('cta.title.part2')}
            </h2>
            <p className="text-base text-slate-500 mb-8 max-w-sm">
              {t('cta.desc')}
            </p>

            <div className="flex flex-col gap-4">
              {[
                t('cta.feature1'),
                t('cta.feature2'),
                t('cta.feature3')
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
              {t('pricing.popular')}
            </div>

            <div className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest mb-4">
              {t('pricing.planName')}
            </div>

            <div className="mb-6">
              <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {t('hero.stats.comingSoon')}
              </span>
              <p className="mt-2 text-sm text-slate-500">{t('pricing.announced')}</p>
            </div>

            <p className="text-sm text-slate-500 mb-8">
              {t('pricing.desc')}
            </p>

            <ButtonLink
              variant="primary"
              className="w-full text-center py-4 shadow-lg"
              href="/register"
            >
              {t('nav.signup')}
            </ButtonLink>

            <div className="text-center text-xs text-slate-400 mt-4">
              {t('pricing.noCard')}
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}