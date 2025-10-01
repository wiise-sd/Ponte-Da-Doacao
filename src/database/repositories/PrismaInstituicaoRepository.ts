import { Instituicao, Prisma } from "@/generated/prisma";
import { InstituicaoRepository } from "./InstituicaoRepository";
import { prisma } from "@/config/db";

export class PrismaInstituicaoRepository implements InstituicaoRepository {
  async create(data: Prisma.InstituicaoCreateInput): Promise<Instituicao> {
    const instituicao = await prisma.instituicao.create({
      data,
    });
    return instituicao;
  }

  async findById(id: string): Promise<Instituicao | null> {
    const instituicao = await prisma.instituicao.findUnique({
      where: { id },
    });
    return instituicao;
  }

  async findByEmail(email: string): Promise<Instituicao | null> {
    const instituicao = await prisma.instituicao.findUnique({
      where: { email },
    });
    return instituicao;
  }
}
