import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters long"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
  }),
});
