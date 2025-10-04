import { createInstituicaoSchema } from "@/schemas/InstituicaoSchema";
import {
  CnpjAlreadyInUseError,
  EmailAlreadyInUseError,
} from "@/use-cases/errors/instituicao";
import { CreateInstituicaoUseCase } from "@/use-cases/registrar/create-instituicao";
import { ZodError } from "zod";

interface HttpRequest {
  body: {
    nome: string;
    cnpj: string;
    telefone: string;
    email: string;
    senha: string;
    descricao: string;
  };
}

export class InstituicaoController {
  constructor(private instituicaoUseCase: CreateInstituicaoUseCase) {}

  async handle(resquest: HttpRequest) {
    try {
      const params = resquest.body;

      await createInstituicaoSchema.parseAsync(params);

      const createdInstituicao = await this.instituicaoUseCase.handle(
        resquest.body
      );
      return {
        status: 201,
        body: createdInstituicao,
      };
    } catch (err) {
      console.error("Error creating institution:", err);

      if (err instanceof ZodError) {
        return {
          status: 400,
          body: {
            message: err.errors[0].message,
          },
        };
      }

      if (err instanceof EmailAlreadyInUseError) {
        return {
          status: 409,
          body: {
            message: err.message,
          },
        };
      }

      if (err instanceof CnpjAlreadyInUseError) {
        return {
          status: 409,
          body: {
            message: err.message,
          },
        };
      }

      return {
        status: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }
}
