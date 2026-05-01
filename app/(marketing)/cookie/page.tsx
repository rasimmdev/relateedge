import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — RelateEdge',
}

export default function CookiePolicy() {
  return (
    <main className="max-w-[700px] mx-auto px-6 py-24 min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Cookie Policy</h1>
      <div className="prose prose-slate prose-a:text-indigo-600">
        <p className="text-slate-600 mb-6">Last updated: April 2026</p>
        <p className="text-slate-600 mb-4">
          This Cookie Policy explains how RelateEdge uses cookies and similar technologies to recognize you when you visit our website.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">What are cookies?</h2>
        <p className="text-slate-600 mb-4">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. We use cookies to enable core functionality such as user login and secure sessions.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">How we use them</h2>
        <p className="text-slate-600 mb-4">
          We use strictly necessary cookies to keep you logged in to your account. We may also use analytics cookies to understand how our users navigate the site and improve the experience.
        </p>
      </div>
    </main>
  )
}
