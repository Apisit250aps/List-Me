import LoginForm from "@/components/forms/auth/LoginForm"
import RegisterForm from "@/components/forms/auth/RegisterForm"
export default function AuthPage() {
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Login"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box"
        >
          <LoginForm />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Register"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box"
        >
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
