"use server"

import { findIdSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"

export const findIdAction = async (_: unknown, formData: FormData) => {
  return authAction(_, formData, findIdSchema)
}
