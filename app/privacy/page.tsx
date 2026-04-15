import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — RelateEdge',
}

export default function Privacy() {
  return (
    <main className="max-w-[700px] mx-auto px-6 py-24 min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
      <div className="prose prose-slate prose-a:text-indigo-600">
        <p className="text-slate-600 mb-6">Last updated: April 2026</p>
        <p className="text-slate-600 mb-4">
          At RelateEdge, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our proposal generation service.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Information we collect</h2>
        <p className="text-slate-600 mb-4">
          We only collect the information necessary to provide our service, primarily the job descriptions you paste into our platform and the proposals we generate for you. We do not store your Upwork credentials.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. How we use your information</h2>
        <p className="text-slate-600 mb-4">
          Your job descriptions are processed transiently to generate proposals and are not used to train global AI models without your explicit consent.
        </p>
      </div>
    </main>
  )
}
