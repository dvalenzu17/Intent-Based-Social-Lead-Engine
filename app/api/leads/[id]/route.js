import { supabase } from '@/lib/supabase/client'

export async function PATCH(request, { params }) {
  const { status } = await request.json()

  const VALID_STATUSES = ['new', 'saved', 'replied', 'ignored']
  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 })
  }

  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', params.id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
