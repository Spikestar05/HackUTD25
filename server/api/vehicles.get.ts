// server/api/vehicles.get.ts
import { MongoClient, ObjectId } from 'mongodb';

let cachedClient: MongoClient | null = null;

async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?appName=${process.env.MONGO_APP_NAME}`;
  const client = new MongoClient(uri);

  await client.connect();
  cachedClient = client;
  return client;
}

export default defineEventHandler(async (event) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGO_DB_NAME || 'your_database_name');
    const collection = db.collection(process.env.MONGO_COLLECTION || 'vehicles');

    // Get query parameters
    const query = getQuery(event) as Record<string, unknown>;
    
    // Build MongoDB filter
    const filter: Record<string, any> = {};
    
    if (typeof query.model === 'string') filter.Model = query.model;
    if (typeof query.trim === 'string') filter.Trim = query.trim;
    if (typeof query.engine === 'string') filter.Engine = query.engine;
    if (typeof query.drivetrain === 'string') filter.DriveTrain = query.drivetrain;
    if (typeof query.fuelType === 'string') filter['Fuel Type'] = query.fuelType;
    if (typeof query.id === 'string') {
      try {
        filter._id = new ObjectId(query.id);
      } catch (e) {
        // ignore invalid ObjectId and leave filter without _id
      }
    }

    // Execute query
    const vehicles = await collection.find(filter).toArray();

    return {
      success: true,
      count: vehicles.length,
      data: vehicles
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