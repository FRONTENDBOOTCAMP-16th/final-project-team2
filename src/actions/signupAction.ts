"use server"

import { signupSchema } from "@/app/lib/ahth"
import { ahthAction } from "./auth.actions"

export const signupAction = async (_: unknown, formData: FormData) => {
  return ahthAction(_, formData, signupSchema)
}
