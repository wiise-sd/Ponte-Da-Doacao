  import "dotenv/config"
  import {envSchema} from "@/schemas/envSchema"

  const _env = envSchema.safeParse(process.env)

  if (!_env.success) {
    console.error("Invalid environment variable", _env.error.format())
    throw new Error("Invalid environment variables.")
  }

export const env = _env.data
