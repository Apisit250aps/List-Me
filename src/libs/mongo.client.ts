import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let mongoClient: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // ในโหมด development ใช้ global variable เพื่อรักษาการเชื่อมต่อระหว่าง hot reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  mongoClient = globalWithMongo._mongoClientPromise
} else {
  // ในโหมด production สร้าง client ใหม่
  client = new MongoClient(uri, options)
  mongoClient = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClient
