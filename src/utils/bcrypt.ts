import { compare, genSalt, hash } from "bcrypt";

const HASH_SALT = 10;

export async function hashPassword(password: string): Promise<string> {
  const saltGenerated = await genSalt(HASH_SALT);

  return await hash(password, saltGenerated);
}

export async function hashVerify(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await compare(password, hashPassword);
}
