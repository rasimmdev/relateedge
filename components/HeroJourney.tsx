'use client'

import { useState, useRef, useEffect, ReactElement } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { IcSparkle, IcSearch, IcTarget, IcPen, IcChart } from './Icons'
import { useLanguage } from './LanguageContext'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  LineChart, Line, AreaChart, Area, Cell, ResponsiveContainer
} from 'recharts'



const STEPS = [
  {
    id: 'step-1',
    title: 'The Chaos',
    desc: 'Manual bidding is a race to the bottom. Low conversion rates and wasted hours lead to burnout.',
    icon: <IcSearch />,
    accent: '#ef4444',
    bg: 'bg-red-50/40',
    badge: 'bg-red-50/50 border-red-100/50 text-red-600',
  },
  {
    id: 'step-2',
    title: 'The Insight',
    desc: 'RelateEdge identifies high-value opportunities by analyzing client history and project fit.',
    icon: <IcTarget />,
    accent: '#4f46e5',
    bg: 'bg-indigo-50/40',
    badge: 'bg-indigo-50/50 border-indigo-100/50 text-indigo-600',
  },
  {
    id: 'step-3',
    title: 'The Quality',
    desc: 'Our AI generates proposals that outscore 95% of competitors on personalization and relevance.',
    icon: <IcPen />,
    accent: '#8b5cf6',
    bg: 'bg-purple-50/40',
    badge: 'bg-purple-50/50 border-purple-100/50 text-purple-600',
  },
  {
    id: 'step-4',
    title: 'The Growth',
    desc: 'Watch your income and reply rate soar as you focus on high-paying jobs that match your skills.',
    icon: <IcChart />,
    accent: '#10b981',
    bg: 'bg-emerald-50/40',
    badge: 'bg-emerald-50/50 border-emerald-100/50 text-emerald-600',
  }
]

const manualData = [
  { name: 'Mon', effort: 80, result: 10 },
  { name: 'Tue', effort: 90, result: 15 },
  { name: 'Wed', effort: 85, result: 8 },
  { name: 'Thu', effort: 95, result: 12 },
  { name: 'Fri', effort: 70, result: 5 },
]

const analysisData = [
  { name: 'Fit', value: 85 },
  { name: 'Budget', value: 70 },
  { name: 'History', value: 90 },
  { name: 'Risk', value: 20 },
]

const qualityData = [
  { name: 'Personalization', us: 98, them: 30 },
  { name: 'Technical Depth', us: 92, them: 45 },
  { name: 'Structure', us: 95, them: 20 },
  { name: 'Hook Score', us: 88, them: 15 },
]

const growthData = [
  { name: 'Week 1', income: 400 },
  { name: 'Week 2', income: 850 },
  { name: 'Week 3', income: 1600 },
  { name: 'Week 4', income: 2400 },
]

const CustomTooltip = ({ active, payload, label, accent }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative bg-white/90 backdrop-blur-md border border-slate-100 p-3 shadow-xl rounded-2xl">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</div>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || accent }} />
                <span className="text-[11px] font-bold text-slate-600 capitalize">{entry.name}:</span>
              </div>
              <span className="text-[11px] font-black text-slate-900">
                {entry.name === 'income' ? `$${entry.value}` : `${entry.value}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}


export default function HeroJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      
      const progress = Math.max(0, Math.min(1, -rect.top / total))
      const idx = Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1)
      
      setActiveIdx(prev => prev !== idx ? idx : prev)
    }

    const scrollInterval = setInterval(onScroll, 100)
    
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(scrollInterval)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-[400vh] transition-colors duration-1000">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              backgroundColor: STEPS[activeIdx].accent,
              opacity: 0.04
            }}
            className="absolute inset-0 transition-colors duration-1000" 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] border border-black/[0.02] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[600px] border border-black/[0.02] rounded-full" />
        </div>

        <div className="max-w-[1200px] w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 py-12 lg:py-0">
          
          <div className="space-y-4 md:space-y-8 text-center lg:text-left">
            <motion.div 
              animate={{ 
                backgroundColor: STEPS[activeIdx].accent + '15',
                borderColor: STEPS[activeIdx].accent + '30',
                color: STEPS[activeIdx].accent
              }}
              className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full border uppercase tracking-widest transition-colors duration-500 mx-auto lg:mx-0"
            >
              <div className="w-3 h-3 md:w-4 md:h-4 shrink-0 flex items-center justify-center">
                <IcSparkle />
              </div>
              <span>{t('journey.badge')}</span>
            </motion.div>

            <div className="space-y-3 md:space-y-4 min-h-[140px] md:min-h-[220px] flex flex-col justify-center relative">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="absolute inset-x-0 flex flex-col justify-center transition-all duration-500"
                  style={{
                    opacity: activeIdx === i ? 1 : 0,
                    pointerEvents: activeIdx === i ? 'auto' : 'none',
                    transform: activeIdx === i ? 'translateY(0)' : (activeIdx < i ? 'translateY(10px)' : 'translateY(-10px)')
                  }}
                >
                  <h2 className="text-[clamp(32px,8vw,72px)] font-black text-slate-900 leading-[0.95] tracking-tighter mb-4 md:mb-6">
                    {t(`journey.step${i + 1}.title`)}
                  </h2>
                  <p className="text-base md:text-xl text-slate-500 max-w-md leading-relaxed mx-auto lg:mx-0">
                    {t(`journey.step${i + 1}.desc`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start gap-2 md:gap-3 pt-4 md:pt-8">
              {STEPS.map((_, i) => (
                <div 
                  key={i}
                  className="h-1 md:h-1.5 rounded-full bg-slate-100 overflow-hidden"
                  style={{ width: i === activeIdx ? '40px' : '12px', transition: 'width 0.5s ease' }}
                >
                  <motion.div 
                    className="h-full transition-colors duration-500"
                    style={{ 
                      backgroundColor: i <= activeIdx ? STEPS[activeIdx].accent : '#e2e8f0' 
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[260px] md:h-[320px] max-w-[550px] w-full mx-auto order-first lg:order-last perspective-[1000px]">
            {STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 w-full h-full rounded-[24px] md:rounded-[32px] shadow-xl md:shadow-2xl flex flex-col items-center justify-center p-4 md:p-6 ${step.bg} border border-black/5 overflow-hidden select-none transition-all duration-500`}
                  style={{
                    opacity: activeIdx === i ? 1 : 0,
                    pointerEvents: activeIdx === i ? 'auto' : 'none',
                    transform: activeIdx === i ? 'scale(1)' : (activeIdx < i ? 'scale(0.98)' : 'scale(1.02)')
                  }}
                >
                  <div className="w-full h-full flex flex-col">
                    <div className="mb-4 flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                        {t('journey.analytics.label')}
                      </span>
                      <div className="flex gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    <div className="flex-1 w-full min-h-[150px] py-2 relative overflow-hidden">
                          {i === 0 ? (
                          <AreaChart data={manualData} width={500} height={200} style={{ width: '100%', height: '100%' }}>
                            <defs>
                              <linearGradient id="colorEffort" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip accent={step.accent} />} />
                            <Area type="monotone" dataKey="effort" stroke="#ef4444" fillOpacity={1} fill="url(#colorEffort)" strokeWidth={3} />
                            <Area type="monotone" dataKey="result" stroke="#94a3b8" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                          </AreaChart>
                        ) : i === 1 ? (
                          <BarChart data={analysisData} layout="vertical" width={500} height={200} style={{ width: '100%', height: '100%' }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" hide />
                            <Tooltip content={<CustomTooltip accent={step.accent} />} cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                              {analysisData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 3 ? '#94a3b8' : '#4f46e5'} />
                              ))}
                            </Bar>
                          </BarChart>
                        ) : i === 2 ? (
                          <BarChart data={qualityData} width={500} height={200} style={{ width: '100%', height: '100%' }}>
                            <XAxis dataKey="name" hide />
                            <Tooltip content={<CustomTooltip accent={step.accent} />} cursor={{fill: 'transparent'}} />
                            <Bar dataKey="us" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="them" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        ) : (
                          <LineChart data={growthData} width={500} height={200} style={{ width: '100%', height: '100%' }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                            <XAxis dataKey="name" hide />
                            <Tooltip content={<CustomTooltip accent={step.accent} />} />
                            <Line 
                              type="stepAfter" 
                              dataKey="income" 
                              stroke="#10b981" 
                              strokeWidth={4} 
                              dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        )}
                    </div>

                    <div className="mt-4 pt-4 pb-2 border-t border-black/[0.03] flex justify-between items-end">
                       <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t('journey.metric.label')}</div>
                          <div className="text-lg font-bold tracking-tight text-slate-700">
                            {t(`journey.metric.step${i + 1}`)}
                          </div>
                       </div>
                       <div className={`p-1.5 rounded-lg ${step.bg} border border-black/[0.03]`}>
                          <div className="w-4 h-4" style={{ color: step.accent }}>
                            {step.icon}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>

        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 border-2 border-slate-400 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{t('journey.scroll')}</span>
        </motion.div>
      </div>
    </section>
  )
}
