"use server"

import { resetPasswordCheckSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"

export const resetPasswordCheckAction = async (_: unknown, formData: FormData) => {
  return authAction(_, formData, resetPasswordCheckSchema)
}
