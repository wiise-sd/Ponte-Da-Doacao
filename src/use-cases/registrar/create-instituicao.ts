import { InstituicaoRepository } from "@/database/repositories/InstituicaoRepository";
import { Prisma } from "@/generated/prisma";
import { hashPassword } from "@/utils/bcrypt";

export class CreateInstituicaoUseCase {
  constructor(private instituicaoRepository: InstituicaoRepository) {}

  async handle(data: Prisma.InstituicaoCreateInput) {
    const { nome, email, telefone, senha, descricao, cnpj } = data;

    const instituicaoWithProvidedEmail =
      await this.instituicaoRepository.findByEmail(email);

    if (instituicaoWithProvidedEmail) {
      throw new Error("Instituição com esse email já existe.");
    }

    const cnpjWithProvidedCnpj =
      await this.instituicaoRepository.findByCnpj(cnpj);

    if (cnpjWithProvidedCnpj) {
      throw new Error("Instituição com esse CNPJ já existe.");
    }

    const senha_hash = await hashPassword(senha);

    const instituicao = {
      id: crypto.randomUUID(),
      nome,
      email,
      telefone,
      senha: senha_hash,
      descricao,
      cnpj,
    };

    return this.instituicaoRepository.create(instituicao);
  }
}
