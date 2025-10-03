import { InstituicaoRepository } from "@/database/repositories/InstituicaoRepository";
import { Prisma } from "@/generated/prisma";
import { hashPassword } from "@/utils/bcrypt";
import {
  CnpjAlreadyInUseError,
  EmailAlreadyInUseError,
} from "../errors/instituicao";

export class CreateInstituicaoUseCase {
  constructor(private instituicaoRepository: InstituicaoRepository) {}

  async handle(data: Prisma.InstituicaoCreateInput) {
    const { nome, email, telefone, senha, descricao, cnpj } = data;

    const instituicaoWithProvidedEmail =
      await this.instituicaoRepository.findByEmail(email);

    if (instituicaoWithProvidedEmail) {
      throw new EmailAlreadyInUseError();
    }

    const cnpjWithProvidedCnpj =
      await this.instituicaoRepository.findByCnpj(cnpj);

    if (cnpjWithProvidedCnpj) {
      throw new CnpjAlreadyInUseError();
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

    const instituicaoCreated =
      await this.instituicaoRepository.create(instituicao);

    return {
      id: instituicaoCreated.id,
      nome: instituicaoCreated.nome,
      email: instituicaoCreated.email,
      telefone: instituicaoCreated.telefone,
      descricao: instituicaoCreated.descricao,
      cnpj: instituicaoCreated.cnpj,
    };
  }
}
