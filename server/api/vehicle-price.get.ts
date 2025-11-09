import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../utils/mongo'

const priceFieldCandidates = [
  'Pricing.MSRP',
  'Pricing.Price',
  'Pricing.Base',
  'Pricing.BaseMSRP',
  'MSRP',
  'BaseMSRP',
  'Base MSRP',
  'StartingMSRP',
  'Starting MSRP',
  'VehiclePrice',
  'Vehicle Price',
  'RetailPrice',
  'Retail Price',
  'Price',
  'price'
]

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
}

function getValueByPath(document: Record<string, any>, path: string) {
  return path.split('.').reduce<any>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key]
    }
    return undefined
  }, document)
}

function parsePrice(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  if (typeof value === 'string') {
    const numeric = Number.parseFloat(value.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(numeric) ? numeric : null
  }
  return null
}

function extractPrice(vehicle: Record<string, any> | null): number | null {
  if (!vehicle) {
    return null
  }

  for (const key of priceFieldCandidates) {
    const value = key.includes('.') ? getValueByPath(vehicle, key) : vehicle[key]
    const parsed = parsePrice(value)
    if (parsed !== null && parsed > 0) {
      return parsed
    }
  }

  return null
}

export default defineEventHandler(async (event) => {
  try {
    const client = await connectToDatabase()
    const env = (globalThis as any)?.process?.env ?? {}
    const db = client.db(env.MONGO_DB_NAME || 'your_database_name')
    const collection = db.collection(env.MONGO_COLLECTION || 'vehicles')

    const query = getQuery(event) as Record<string, unknown>

    const filter: Record<string, any> = {}

    Object.entries(queryFieldMap).forEach(([queryKey, dbField]) => {
      const value = query[queryKey]
      if (typeof value === 'string' && value.length > 0) {
        filter[dbField] = value
      }
    })

    if (typeof query.id === 'string') {
      try {
        filter._id = new ObjectId(query.id)
      } catch {
        // ignore invalid ObjectId
      }
    }

    const vehicle = await collection.findOne(filter)
    const price = extractPrice(vehicle)

    return {
      success: true,
      price: typeof price === 'number' ? price : null,
      vehicleId: vehicle?._id ? String(vehicle._id) : null,
      matched: vehicle ? true : false
    }
  } catch (error) {
    console.error('Database error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return {
      success: false,
      error: message
    }
  }
})

