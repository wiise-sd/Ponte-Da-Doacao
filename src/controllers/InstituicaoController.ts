import { CreateInstituicaoUseCase } from "@/use-cases/registrar/create-instituicao";

interface HttpRequest {
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  senha: string;
  descricao: string;
}

export class InstituicaoController {
  constructor(private instituicaoUseCase: CreateInstituicaoUseCase) {}

  async handle(resquest: HttpRequest) {
    try {
      const createdInstituicao = await this.instituicaoUseCase.handle(resquest);
      return {
        status: 201,
        body: createdInstituicao,
      };
    } catch (error) {
      console.error("Error creating institution:", error);
      return {
        status: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }
}
