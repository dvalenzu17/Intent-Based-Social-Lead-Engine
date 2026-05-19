import { runIngestion } from '@/lib/ingest'

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }
  const results = await runIngestion()
  return Response.json(results)
}
