import { Raleway } from "next/font/google"

/**
 * Heuristic intent scoring engine.  
 * No AI. Pure keyword signal scoring. Fast, free, deterministic.
 * Returns { intent_score, intent_type } or null if score === 0.
 */

const STATJOT_SIGNALS = [
  // Phrase matches (simple contains)
  { test: t => t.includes('ga4 alternative'), weight: 40, type: 'buying_intent' },
  { test: t => t.includes('google analytics alternative'), weight: 40, type: 'buying_intent' },
  { test: t => t.includes('replace ga4'), weight: 40, type: 'buying_intent' },
  { test: t => t.includes('switch from google analytics'), weight: 35, type: 'buying_intent' },
  { test: t => t.includes('plausible alternative'), weight: 35, type: 'buying_intent' },
  // Compound matches
  { test: t => t.includes('what analytics') && t.includes('recommend'), weight: 35, type: 'recommendation_request' },
  { test: t => t.includes('analytics tool') && (t.includes('startup') || t.includes('indie')), weight: 30, type: 'recommendation_request' },
  // Complaint phrases
  { test: t => t.includes('ga4 sucks') || t.includes('ga4 is terrible') || t.includes('hate ga4'), weight: 25, type: 'complaint' },
  { test: t => t.includes('ga4') && (t.includes('confusing') || t.includes('complex') || t.includes('broken')), weight: 20, type: 'complaint' },
  { test: t => t.includes('plausible') && (t.includes('expensive') || t.includes('too much')), weight: 20, type: 'complaint' },
  // Pain points
  { test: t => t.includes('privacy analytics') || t.includes('cookie-free analytics'), weight: 20, type: 'pain_point' },
  { test: t => t.includes('gdpr analytics'), weight: 15, type: 'pain_point' },
  { test: t => t.includes('lightweight analytics'), weight: 15, type: 'pain_point' },
  // General mention (lowest weight)
  { test: t => t.includes('ga4'), weight: 5, type: 'general' },
]

const BEFOREITBILLS_SIGNALS = [
  { test: t => t.includes('cancel subscriptions'), weight: 40, type: 'buying_intent' },
  { test: t => t.includes('track subscriptions'), weight: 40, type: 'buying_intent' },
  { test: t => t.includes('subscription tracker'), weight: 40, type: 'buying_intent' },
  // Pain points
  { test: t => t.includes('forgot about subscription'), weight: 35, type: 'pain_point' },
  // Compound
  { test: t => t.includes('subscription management') && (t.includes('app') || t.includes('tool')), weight: 35, type: 'recommendation_request' },
  // Complaints
  { test: t => t.includes('subscription hell'), weight: 30, type: 'complaint' },
  { test: t => t.includes('too many subscriptions'), weight: 25, type: 'complaint' },
  // Pain points (compound)
  { test: t => t.includes('recurring charges') && (t.includes('track') || t.includes('manage')), weight: 25, type: 'pain_point' },
  // Buying intent
  { test: t => t.includes('cancel unused subscriptions'), weight: 25, type: 'buying_intent' },
  // Pain point
  { test: t => t.includes('subscription audit'), weight: 20, type: 'pain_point' },
  // General mention (lowest weight)
  { test: t => t.includes('subscriptions'), weight: 5, type: 'general' },
]

const SIGNALS_BY_PRODUCT = {
  statjot: STATJOT_SIGNALS,
  beforeitbills: BEFOREITBILLS_SIGNALS,
}

/**
 * Score a post for a given product.
 * @param {object} post - { title, body, ... }
 * @param {string} product - 'statjot' | 'beforeitbills'
 * @returns {{ intent_score: number, intent_type: string } | null}
 */
export function scorePost(post, product) {
  const signals = SIGNALS_BY_PRODUCT[product]
  if (!signals) return null

  // Combine title + body, normalised to lowercase
  const text = `${post.title || ''} ${post.body || ''}`.toLowerCase()

  let totalScore = 0
  let topWeight = 0
  let topType = 'general'

  for (const signal of signals) {
    if (signal.test(text)) {
      totalScore += signal.weight
      if (signal.weight > topWeight) {
        topWeight = signal.weight
        topType = signal.type
      }
    }
  }

  if (totalScore === 0) return null

  return {
    intent_score: Math.min(totalScore, 100),
    intent_type: topType,
  }
}
