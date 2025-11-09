import { MongoClient, ObjectId } from 'mongodb';

let cachedClient: MongoClient | null = null;

async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  const uri = `mongodb+srv://${process.env.MONGO_USER}:<${process.env.MONGO_PASSWORD}>@${process.env.MONGO_CLUSTER}/?appName=${process.env.MONGO_APP_NAME}`;
  
  // The MongoClient constructor accepts fewer top-level legacy options in newer drivers.
  const client = new MongoClient(uri);

  await client.connect();
  cachedClient = client;
  return client;
}

export default defineEventHandler(async (event) => {
  try {
    const id = event.context?.params?.id;

    if (!id) {
      return {
        success: false,
        error: 'Missing id parameter'
      };
    }
    
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGO_DB_NAME || 'your_database_name');
    const collection = db.collection(process.env.MONGO_COLLECTION || 'vehicles');

    const vehicle = await collection.findOne({ _id: new ObjectId(String(id)) });

    if (!vehicle) {
      return {
        success: false,
        error: 'Vehicle not found'
      };
    }

    return {
      success: true,
      data: vehicle
    };

  } catch (error) {
    console.error('Database error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: message
    };
  }
});