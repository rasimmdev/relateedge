import Link from 'next/link'

export default function ComingSoon({
  title,
  description = 'We are finishing the experience. Check back soon.',
}: {
  title: string
  description?: string
}) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-lg flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
        RelateEdge
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-500">{description}</p>
      <p className="mt-8 text-2xl font-black tracking-tight text-indigo-600">Coming soon</p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
      >
        ← Back to home
      </Link>
    </main>
  )
}
