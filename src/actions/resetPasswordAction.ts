"use server"

import { resetPasswordSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"

export const resetPasswordAction = async (_: unknown, formData: FormData) => {
  return authAction(_, formData, resetPasswordSchema)
}
