import mongoClient from "@/libs/mongo.client"
import { ITask } from "@/models/task.model"
import { MongoClient, ObjectId } from "mongodb"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  let client: MongoClient

  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (!session || !session.sub) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user_id = new ObjectId(session.sub)
    const data: ITask = await req.json()
    client = await mongoClient
    const db = client.db()

    const user = await db.collection("users").findOne({ _id: user_id })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const newTask: ITask = {
      ...data,
      user: user_id
    }

    const result = await db.collection<ITask>("tasks").insertOne(newTask)
    return NextResponse.json(
      { message: "Task saved successfully", taskId: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error saving task:", error)
    return NextResponse.json(
      { message: "Failed to save task", error: (error as Error).message },
      { status: 500 }
    )
  }
}

