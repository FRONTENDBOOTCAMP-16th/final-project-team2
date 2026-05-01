"use server"

import { loginSchema } from "@/app/lib/ahth"
import { ahthAction } from "./auth.actions"

export const loginAction = async (_: unknown, formData: FormData) => {
  return ahthAction(_, formData, loginSchema)
}
