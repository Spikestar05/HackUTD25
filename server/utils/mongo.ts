import { MongoClient } from 'mongodb'

let cachedClient: MongoClient | null = null

export async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient
  }

  const env = (globalThis as any)?.process?.env ?? {}
  const uri = `mongodb+srv://${env.MONGO_USER ?? ''}:${env.MONGO_PASSWORD ?? ''}@${env.MONGO_CLUSTER ?? ''}/?appName=${env.MONGO_APP_NAME ?? ''}`
  const client = new MongoClient(uri)

  await client.connect()
  cachedClient = client
  return client
}

