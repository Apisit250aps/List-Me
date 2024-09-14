"use client"
import React, { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // MongoDBAdapter(mongoClient).createUser(email, password)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        callbackUrl: "/",
        email,
        password
      })
      if (result?.error) {
        // Handle error (e.g., show error message)
        console.error(result.error)
      }
      if (result?.ok) {
        // Handle success (e.g., redirect to dashboard)
        console.log("Signed in successfully")
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="card bg-base-100 w-full shadow-2xl">
      <div className="card-body">
        <div className="grid grid-cols-1 gap-3">
          <button
            className="btn btn-wide btn-outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {!isLoading ? (
              <div className="inline-flex">
                <i className="bx bxl-google me-2"></i>Login with Google
              </div>
            ) : (
              <span className="loading loading-spinner loading-lg"></span>
            )}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-active btn-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
