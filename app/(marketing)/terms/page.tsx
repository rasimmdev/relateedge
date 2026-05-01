import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — RelateEdge',
}

export default function Terms() {
  return (
    <main className="max-w-[700px] mx-auto px-6 py-24 min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Terms of Service</h1>
      <div className="prose prose-slate prose-a:text-indigo-600">
        <p className="text-slate-600 mb-6">Last updated: April 2026</p>
        <p className="text-slate-600 mb-4">
          By accessing or using RelateEdge, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Use License</h2>
        <p className="text-slate-600 mb-4">
          Permission is granted to temporarily use RelateEdge for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Disclaimer</h2>
        <p className="text-slate-600 mb-4">
          The materials on RelateEdge are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
        </p>
      </div>
    </main>
  )
}
