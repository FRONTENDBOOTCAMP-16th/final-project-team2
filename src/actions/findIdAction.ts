"use server"

import { findIdSchema } from "@/app/lib/ahth"
import { ahthAction } from "./auth.actions"

export const findIdAction = async (_: unknown, formData: FormData) => {
  return ahthAction(_, formData, findIdSchema)
}
