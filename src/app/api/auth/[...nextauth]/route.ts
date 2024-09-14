import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import Google from "@/providers/google.provider"
import mongoClient from "@/libs/mongo.client"
import Credentials from "next-auth/providers/credentials"
import { comparePasswords } from "@/libs/password"
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name?: string
    } & DefaultSession["user"]
  }
  interface User {
    name?: string
  }
}

const authOptions = {
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const client = mongoClient
        const db = client.db()
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email })

        if (
          user &&
          (await comparePasswords(credentials.password, user.password))
        ) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
        session.user.name = user.name
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  // pages: {
  //   signIn: "/api/auth/signin",
  //   signOut: "/api/auth/signout",
  //   profile: "/api/auth/profile"
  // }
} as AuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
