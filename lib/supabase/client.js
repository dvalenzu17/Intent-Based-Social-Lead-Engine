import { createClient } from '@supabase/supabase-js'

let _client = null

export function getSupabase() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
  return _client
}

// Convenience named export used throughout — same singleton, lazy init
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      return getSupabase()[prop]
    },
  }
)
