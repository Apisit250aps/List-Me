import { ReactNode } from "react"
import { IInput } from "./Input"

interface IInputIcon extends IInput {
  children: ReactNode
}

export default function InputIcon({ children, type, placeholder }: IInputIcon) {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {children}
      <input type={type || "text"} className="grow" placeholder={placeholder}/>
    </label>
  )
}
