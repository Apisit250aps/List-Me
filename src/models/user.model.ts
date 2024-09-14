import { ObjectId, Document } from "mongodb"

export interface IUser extends Document{
  name: string
  email: string
  password: string
  emailVerified?: Date
  image?: string
  role?: "user" | "admin"
  accounts: ObjectId[]
  sessions: ObjectId[]
}
