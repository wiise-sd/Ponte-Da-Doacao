import { Instituicao, Prisma } from "@/generated/prisma";

export interface InstituicaoRepository {
  create(instituicao: Prisma.InstituicaoCreateInput): Promise<Instituicao>;
  findById(id: string): Promise<Instituicao | null>;
  findByEmail(email: string): Promise<Instituicao | null>;
  findByCnpj(cnpj: string): Promise<Instituicao | null>;
}
