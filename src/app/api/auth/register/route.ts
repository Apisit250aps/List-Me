// app/api/auth/register/route.ts
import { NextResponse } from "next/server"

import { hashPassword } from "@/libs/password"
import mongoClient from "@/libs/mongo.client"

interface IUser {
  email: string
  name?: string
  password: string
}

export async function POST(req: Request) {
  try {
    const { email, password, name } = (await req.json()) as IUser
    const client = mongoClient
    const db = client.db()

    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      if (existingUser.googleId) {
        const hashedPassword = await hashPassword(password)
        await db
          .collection("users")
          .updateOne({ email }, { $set: { password: hashedPassword } })
        return NextResponse.json({
          message: "Credentials added to existing Google account"
        })
      } else {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        )
      }
    }

    const hashedPassword = await hashPassword(password)
    await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name
    })

    return NextResponse.json({ message: "User registered successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
