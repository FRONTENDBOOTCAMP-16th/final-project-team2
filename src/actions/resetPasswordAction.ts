"use server"

import { resetPasswordSchema } from "@/app/lib/ahth"
import { ahthAction } from "./auth.actions"

export const resetPasswordAction = async (_: unknown, formData: FormData) => {
  return ahthAction(_, formData, resetPasswordSchema)
}
