import Link from 'next/link'

export const metadata = {
  title: 'SignalHunt',
  description: 'Intent-based social lead engine for Statjot and BeforeItBills',
}

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="border-b border-gray-800 bg-gray-900/80 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-white tracking-tight">
            Signal<span className="text-indigo-400">Hunt</span>
          </span>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Feed
            </Link>
            <Link
              href="/saved"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Saved
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
