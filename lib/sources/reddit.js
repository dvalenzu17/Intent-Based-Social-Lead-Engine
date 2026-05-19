const DELAY_MS = 1100

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export async function fetchReddit(query) {
  await sleep(DELAY_MS)
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&limit=25&t=day`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'SignalHunt/1.0 (internal tool)' }
  })
  if (!res.ok) return []
  const data = await res.json()
  const items = data?.data?.children || []
  return items.map(({ data: p }) => ({
    source: 'reddit',
    external_id: p.id,
    title: p.title,
    body: p.selftext || '',
    url: `https://reddit.com${p.permalink}`,
    author: p.author,
    subreddit: p.subreddit,
    created_at: new Date(p.created_utc * 1000).toISOString()
  }))
}
