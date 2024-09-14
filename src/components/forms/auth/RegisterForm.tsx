"use client"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import { FormEvent, useCallback, useState } from "react"
import Swal from "sweetalert2"

export default function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{
    email?: string
    username?: string
    password?: string
  }>({})

  const validateForm = (): boolean => {
    const newErrors: { email?: string; username?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!username) {
      newErrors.username = "Username is required"
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const response = await axios.post("/api/auth/register", {
        email,
        username,
        password
      })

      if (response.status === 200) {
        await Swal.fire({
          title: "Success!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "Great!"
        })
        redirect("/auth")
      } else {
        throw new Error("An unexpected error occurred")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred during registration"
        await Swal.fire({
          title: "Registration Failed",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Try Again"
        })
      } else {
        console.error("Unexpected error:", error)
        await Swal.fire({
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK"
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [email, username, password, router])

  return (
    <div className="card bg-base-100 w-full">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-envelope"></i>
            <input
              type="text"
              className={`grow ${errors.email ? 'input-error' : ''}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {errors.email && <p className="text-error text-start text-xs mt-1">{errors.email}</p>}
          
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-user"></i>
            <input
              type="text"
              className={`grow ${errors.username ? 'input-error' : ''}`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {errors.username && <p className="text-error text-start text-xs mt-1">{errors.username}</p>}
          
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-key"></i>
            <input
              type="password"
              className={`grow ${errors.password ? 'input-error' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {errors.password && <p className="text-error text-start text-xs mt-1">{errors.password}</p>}
          
          <div className="form-control mt-6">
            <button
              className="btn btn-active btn-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}