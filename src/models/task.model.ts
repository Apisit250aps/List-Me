import { ObjectId, Document } from "mongodb"
export interface ITask extends Document {
  _id?: ObjectId | string
  title: string
  description?: string
  completed?: boolean
  dueDate?: Date
  user: ObjectId
  parent?: ObjectId
  subtasks: ObjectId[]
}
