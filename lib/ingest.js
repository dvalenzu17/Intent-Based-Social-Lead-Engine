import { supabase } from './supabase/client.js'
import { fetchHN } from './sources/hn.js'
import { fetchReddit } from './sources/reddit.js'
import { scorePost } from './scoring/intent.js'

const KEYWORD_QUERIES = {
  statjot: [
    'GA4 alternative',
    'Google Analytics alternative',
    'privacy analytics',
    'Plausible Analytics',
    'cookie free analytics',
    'analytics indie',
    'analytics startup',
  ],
  beforeitbills: [
    'subscription tracker',
    'cancel subscriptions',
    'manage subscriptions',
    'subscription management',
    'recurring charges',
  ],
}

export async function runIngestion() {
  const results = { fetched: 0, inserted: 0, leads: 0, errors: [] }

  for (const [product, queries] of Object.entries(KEYWORD_QUERIES)) {
    for (const query of queries) {
      try {
        const [hnPosts, redditPosts] = await Promise.all([
          fetchHN(query),
          fetchReddit(query),
        ])
        const posts = [...hnPosts, ...redditPosts]
        results.fetched += posts.length

        for (const post of posts) {
          // Upsert post — dedup by source+external_id
          // ignoreDuplicates: true means we get null back for existing rows — we only score truly new posts
          const { data: inserted, error } = await supabase
            .from('posts')
            .upsert(post, { onConflict: 'source,external_id', ignoreDuplicates: true })
            .select('id')
            .single()

          if (error || !inserted) continue
          results.inserted++

          // Score the new post
          const score = scorePost(post, product)
          if (!score || score.intent_score === 0) continue

          await supabase.from('leads').insert({
            post_id: inserted.id,
            product,
            intent_score: score.intent_score,
            intent_type: score.intent_type,
            status: 'new',
          })
          results.leads++
        }
      } catch (e) {
        results.errors.push(`${product}/${query}: ${e.message}`)
      }
    }
  }

  return results
}
