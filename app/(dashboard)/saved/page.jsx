import { Suspense } from 'react'
import { supabase } from '@/lib/supabase/client'
import LeadCard from '@/components/LeadCard'
import FilterBar from '@/components/FilterBar'

async function getSavedLeads({ product, source, intentType }) {
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
    .eq('status', 'saved')
    .order('intent_score', { ascending: false })
    .limit(200)

  if (product) query = query.eq('product', product)
  if (intentType) query = query.eq('intent_type', intentType)

  const { data, error } = await query
  if (error) {
    console.error('Supabase error:', error.message)
    return []
  }

  let leads = data || []
  if (source) {
    leads = leads.filter(l => l.posts?.source === source)
  }

  return leads
}

export default async function SavedPage({ searchParams }) {
  const params = await searchParams
  const product = params?.product || ''
  const source = params?.source || ''
  const intentType = params?.intentType || ''

  const leads = await getSavedLeads({ product, source, intentType })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Saved Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {leads.length} saved lead{leads.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Filters (no status filter — always saved) */}
      <div className="mb-5">
        <Suspense>
          <FilterBar
            product={product}
            source={source}
            intentType={intentType}
            status="saved"
          />
        </Suspense>
      </div>

      {/* Lead list */}
      {leads.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-lg mb-2">No saved leads yet</p>
          <p className="text-sm">Save leads from the feed to keep track of them here.</p>
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
