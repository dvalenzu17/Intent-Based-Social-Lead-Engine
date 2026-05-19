'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LeadActions({ leadId, currentStatus }) {
  const router = useRouter()
  const [loading, setLoading] = useState(null)

  async function updateStatus(status) {
    setLoading(status)
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex gap-2">
      {currentStatus !== 'saved' && (
        <button
          onClick={() => updateStatus('saved')}
          disabled={loading !== null}
          className="px-3 py-1 text-xs font-medium rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'saved' ? '...' : 'Save'}
        </button>
      )}
      {currentStatus === 'saved' && (
        <button
          onClick={() => updateStatus('new')}
          disabled={loading !== null}
          className="px-3 py-1 text-xs font-medium rounded-full border border-gray-500 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'new' ? '...' : 'Unsave'}
        </button>
      )}
      {currentStatus !== 'replied' && (
        <button
          onClick={() => updateStatus('replied')}
          disabled={loading !== null}
          className="px-3 py-1 text-xs font-medium rounded-full border border-green-600 text-green-400 hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'replied' ? '...' : 'Replied'}
        </button>
      )}
      {currentStatus !== 'ignored' && (
        <button
          onClick={() => updateStatus('ignored')}
          disabled={loading !== null}
          className="px-3 py-1 text-xs font-medium rounded-full border border-gray-600 text-gray-500 hover:bg-gray-700 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'ignored' ? '...' : 'Ignore'}
        </button>
      )}
    </div>
  )
}
