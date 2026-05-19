export async function fetchHN(query) {
  const oneDayAgo = Math.floor(Date.now() / 1000) - 86400
  const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story,comment&numericFilters=created_at_i>${oneDayAgo}&hitsPerPage=50`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()
  return (data.hits || []).map(hit => ({
    source: 'hn',
    external_id: hit.objectID,
    title: hit.title || hit.comment_text?.slice(0, 100) || '',
    body: hit.comment_text || hit.story_text || '',
    url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    author: hit.author,
    subreddit: null,
    created_at: new Date(hit.created_at).toISOString()
  }))
}
