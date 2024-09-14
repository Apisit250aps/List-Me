"use client"
import React, { useState, FormEvent } from "react"
import { signIn, SignInResponse } from "next-auth/react"
import Swal from "sweetalert2"
import { redirect } from "next/navigation"
import InputIcon from "../inputs/InputIcon"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // MongoDBAdapter(mongoClient).createUser(email, password)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = (await signIn("credentials", {
        redirect: false,
        email,
        password
      })) as SignInResponse
      if (response?.error) {
        // Handle error (e.g., show error message)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error || "Google Sign-In failed!"
        })
      }
      if (response?.ok) {
        // Handle success (e.g., redirect to dashboard)
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You have signed in successfully!"
        })

        redirect("/")
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const response = (await signIn("google")) as SignInResponse

      if (response.error) {
        // Display an error alert if sign-in fails
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error || "Google Sign-In failed!"
        })
      } else {
        // Handle successful sign-in
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You have signed in successfully!"
        })
        // Perform any additional logic after sign-in
        redirect("/")
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card bg-base-100 w-full shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-envelope"></i>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <i className="bx bx-key"></i>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
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
          <div className="divider">or</div>
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
        </form>
      </div>
    </div>
  )
}
