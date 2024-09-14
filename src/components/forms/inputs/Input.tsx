export interface IInput {
  type?:
    | "text"
    | "password"
    | "email"
    | "date"
    | "datetime"
    | "datetime-local"
    | "date-local"
    | "number"
    | "tel"
    | "url"
    | "search" // เพิ่มชนิด input ที่พบบ่อย
  name: string
  placeholder: string
  value?: string | number // รองรับ input ที่เป็นเลขด้วย
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void // ใช้ React.ChangeEvent ให้เหมาะสมกับ onChange
  disabled?: boolean
  error?: string // สำหรับแสดงข้อความ error
  required?: boolean
  disabledError?: boolean // ปิดหรือเปิด error
  autoFocus?: boolean
  maxLength?: number // เพิ่ม attribute สำหรับ input ที่มีความยาวจำกัด
  minLength?: number // เพิ่ม attribute สำหรับ input ที่ต้องการความยาวขั้นต่ำ
  pattern?: string // สำหรับ input ที่ต้องการตรวจสอบ regex
  readOnly?: boolean // กำหนดให้ input เป็น read-only
  autoComplete?: "on" | "off" // เปิด/ปิดการเติมข้อความอัตโนมัติ
}
