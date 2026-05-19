'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function IngestButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function handleIngest() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/ingest', { method: 'POST' })
      const data = await res.json()
      setResult(data)
      router.refresh()
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleIngest}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <>
            <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Running…
          </>
        ) : (
          'Run Ingestion'
        )}
      </button>
      {result && !result.error && (
        <span className="text-xs text-gray-400">
          Fetched {result.fetched} · Inserted {result.inserted} · Leads {result.leads}
          {result.errors?.length > 0 && (
            <span className="text-amber-400 ml-1">· {result.errors.length} errors</span>
          )}
        </span>
      )}
      {result?.error && (
        <span className="text-xs text-red-400">{result.error}</span>
      )}
    </div>
  )
}
