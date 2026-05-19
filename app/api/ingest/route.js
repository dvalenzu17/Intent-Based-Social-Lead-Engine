import { runIngestion } from '@/lib/ingest'

export async function POST() {
  const results = await runIngestion()
  return Response.json(results)
}
