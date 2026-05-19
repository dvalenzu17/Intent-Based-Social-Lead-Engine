import LeadActions from './LeadActions'

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function ScoreBadge({ score }) {
  let colorClass
  if (score >= 70) colorClass = 'bg-green-900/60 text-green-300 border border-green-700'
  else if (score >= 50) colorClass = 'bg-amber-900/60 text-amber-300 border border-amber-700'
  else colorClass = 'bg-gray-800 text-gray-400 border border-gray-700'

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-nums ${colorClass}`}>
      {score}
    </span>
  )
}

function StatusPill({ status }) {
  const map = {
    new: 'bg-blue-900/50 text-blue-300 border border-blue-700',
    saved: 'bg-indigo-900/50 text-indigo-300 border border-indigo-700',
    replied: 'bg-green-900/50 text-green-300 border border-green-700',
    ignored: 'bg-gray-800 text-gray-500 border border-gray-700',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || map.new}`}>
      {status}
    </span>
  )
}

function IntentBadge({ type }) {
  const map = {
    buying_intent: 'bg-purple-900/50 text-purple-300 border border-purple-700',
    recommendation_request: 'bg-cyan-900/50 text-cyan-300 border border-cyan-700',
    complaint: 'bg-red-900/50 text-red-300 border border-red-700',
    pain_point: 'bg-orange-900/50 text-orange-300 border border-orange-700',
    general: 'bg-gray-800 text-gray-400 border border-gray-700',
  }
  const labels = {
    buying_intent: 'buying intent',
    recommendation_request: 'rec. request',
    complaint: 'complaint',
    pain_point: 'pain point',
    general: 'general',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[type] || map.general}`}>
      {labels[type] || type}
    </span>
  )
}

function SourceBadge({ source, subreddit }) {
  if (source === 'hn') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-orange-900/50 text-orange-300 border border-orange-700">
        HN
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-900/50 text-red-300 border border-red-700">
      Reddit{subreddit ? ` · r/${subreddit}` : ''}
    </span>
  )
}

function ProductBadge({ product }) {
  if (product === 'statjot') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-900/50 text-blue-300 border border-blue-700">
        Statjot
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-900/50 text-green-300 border border-green-700">
      BeforeItBills
    </span>
  )
}

export default function LeadCard({ lead }) {
  const { id, intent_score, intent_type, status, scored_at, product, posts } = lead
  const post = posts

  return (
    <article className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gray-100 hover:text-white hover:underline flex-1 leading-snug"
        >
          {post.title || '(no title)'}
        </a>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ScoreBadge score={intent_score} />
        </div>
      </div>

      {/* Body preview */}
      {post.body && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {post.body}
        </p>
      )}

      {/* Badge row */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <SourceBadge source={post.source} subreddit={post.subreddit} />
        <ProductBadge product={product} />
        <IntentBadge type={intent_type} />
        <StatusPill status={status} />
        <span className="text-xs text-gray-600 ml-auto">
          {post.author && <span className="mr-2 text-gray-500">by {post.author}</span>}
          {timeAgo(post.created_at || scored_at)}
        </span>
      </div>

      {/* Actions */}
      <LeadActions leadId={id} currentStatus={status} />
    </article>
  )
}
