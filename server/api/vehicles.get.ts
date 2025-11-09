// server/api/vehicles.get.ts
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../utils/mongo';

const queryFieldMap: Record<string, string> = {
  model: 'Model',
  trim: 'Trim',
  engine: 'Engine',
  transmission: 'Transmission',
  drivetrain: 'DriveTrain',
  driveTrain: 'DriveTrain',
  exteriorColor: 'Exterior Colors',
  interiorColor: 'Interior Colors',
  wheels: 'Wheels',
  fuelType: 'Fuel Type',
  year: 'Year'
};

export default defineEventHandler(async (event) => {
  try {
    const client = await connectToDatabase();
    const env = (globalThis as any)?.process?.env ?? {};
    const db = client.db(env.MONGO_DB_NAME || 'your_database_name');
    const collection = db.collection(env.MONGO_COLLECTION || 'vehicles');

    const query = getQuery(event) as Record<string, unknown>;

    const filter: Record<string, any> = {};

    Object.entries(queryFieldMap).forEach(([queryKey, dbField]) => {
      const value = query[queryKey];
      if (typeof value === 'string' && value.length > 0) {
        filter[dbField] = value;
      }
    });

    if (typeof query.id === 'string') {
      try {
        filter._id = new ObjectId(query.id);
      } catch {
        // ignore invalid ObjectId and leave filter without _id
      }
    }

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