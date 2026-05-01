'use client'

import Link from "next/link";
import Image from "next/image";
import ButtonLink from "./Button";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";
import { useLanguage } from "@/components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { locale, setLocale, t } = useLanguage()
  const [isLangOpen, setIsLangOpen] = useState(false)
  return (
    <header style={{ position: 'sticky', width: '100vw', top: 0, zIndex: 50, padding: '12px 16px 0' }}>
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
              { label: t('nav.howItWorks'), href: '/how-it-works' },
              { label: t('nav.pricing'),      href: '/pricing' },
              { label: t('nav.docs'),         href: '/docs' },
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
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-black/5 transition-colors text-[13px] font-semibold text-slate-600 uppercase tracking-wider"
            >
              <span>{locale}</span>
              <svg 
                className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-32 bg-white border border-black/5 rounded-xl shadow-xl p-1 z-[60]"
                >
                  {(['en', 'ru', 'ua'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLocale(lang)
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        locale === lang ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-black/5'
                      }`}
                    >
                      <span className="uppercase">{lang}</span>
                      {locale === lang && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/login"
            className="hidden md:flex text-slate-600 hover:text-slate-900 transition-colors font-semibold text-[14px]"
          >
            {t('nav.login')}
          </Link>
          <ButtonLink variant="primary" href="/register">
            {t('nav.signup')}
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}