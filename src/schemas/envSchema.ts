import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_PASSWORD: z.string(),
  DB_USER: z.string(),
  DB_PORT: z.coerce.number(),
})
