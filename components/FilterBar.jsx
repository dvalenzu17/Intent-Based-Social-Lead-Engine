'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const PRODUCTS = [
  { value: '', label: 'All products' },
  { value: 'statjot', label: 'Statjot' },
  { value: 'beforeitbills', label: 'BeforeItBills' },
]

const SOURCES = [
  { value: '', label: 'All sources' },
  { value: 'hn', label: 'HN' },
  { value: 'reddit', label: 'Reddit' },
]

const INTENT_TYPES = [
  { value: '', label: 'All intents' },
  { value: 'buying_intent', label: 'Buying intent' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'recommendation_request', label: 'Rec. request' },
  { value: 'pain_point', label: 'Pain point' },
  { value: 'general', label: 'General' },
]

const STATUSES = [
  { value: '', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'saved', label: 'Saved' },
  { value: 'replied', label: 'Replied' },
  { value: 'ignored', label: 'Ignored' },
]

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

export default function FilterBar({ product, source, intentType, status }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function update(key, value) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select
        value={product || ''}
        onChange={v => update('product', v)}
        options={PRODUCTS}
      />
      <Select
        value={source || ''}
        onChange={v => update('source', v)}
        options={SOURCES}
      />
      <Select
        value={intentType || ''}
        onChange={v => update('intentType', v)}
        options={INTENT_TYPES}
      />
      <Select
        value={status || ''}
        onChange={v => update('status', v)}
        options={STATUSES}
      />
    </div>
  )
}
