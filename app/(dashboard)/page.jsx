import { Suspense } from 'react'
import { supabase } from '@/lib/supabase/client'
import LeadCard from '@/components/LeadCard'
import FilterBar from '@/components/FilterBar'
import IngestButton from '@/components/IngestButton'

async function getLeads({ product, source, intentType, status }) {
  let query = supabase
    .from('leads')
    .select(`
      id,
      product,
      intent_score,
      intent_type,
      status,
      scored_at,
      posts (
        id,
        source,
        external_id,
        title,
        body,
        url,
        author,
        subreddit,
        created_at
      )
    `)
    .order('intent_score', { ascending: false })
    .limit(200)

  if (product) query = query.eq('product', product)
  if (intentType) query = query.eq('intent_type', intentType)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) {
    console.error('Supabase error:', error.message)
    return []
  }

  // Source filter happens client-side since it's on the joined posts table
  let leads = data || []
  if (source) {
    leads = leads.filter(l => l.posts?.source === source)
  }

  return leads
}

export default async function FeedPage({ searchParams }) {
  const params = await searchParams
  const product = params?.product || ''
  const source = params?.source || ''
  const intentType = params?.intentType || ''
  const status = params?.status || ''

  const leads = await getLeads({ product, source, intentType, status })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Lead Feed</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} — sorted by intent score
          </p>
        </div>
        <IngestButton />
      </div>

      {/* Filters */}
      <div className="mb-5">
        <Suspense>
          <FilterBar
            product={product}
            source={source}
            intentType={intentType}
            status={status}
          />
        </Suspense>
      </div>

      {/* Lead list */}
      {leads.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-lg mb-2">No leads found</p>
          <p className="text-sm">Run ingestion to fetch new posts, or adjust your filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map(lead => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}
