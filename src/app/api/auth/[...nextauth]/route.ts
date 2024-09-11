import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import Google from "@/providers/google.provider"
import mongoClient from "@/libs/mongo.client"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name?: string
      role?: string
    } & DefaultSession["user"]
  }
  interface User {
    name?: string
    role?: string
  }
}

const authOptions = {
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
        session.user.name = user.name
        session.user.role = user.role // Assuming you have a role field in your user document
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    }
  },
  pages: {
    signIn: "/api/auth/signin",
    signOut: "/api/auth/signout",
    profile: "/api/auth/profile"
  }
} as AuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
