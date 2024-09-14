"use client"
import axios from "axios"
import { useCallback, useState } from "react"

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axios.post("/api/auth/register", {
        email,
        username,
        password
      })

      

    } catch (error) {}
  }, [email, password, username])

  return (
    <div className="card bg-base-100 w-full">
      <div className="card-body">
        <form>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-envelope"></i>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-user"></i>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <i className="bx bx-key"></i>
            <input
              type="password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
