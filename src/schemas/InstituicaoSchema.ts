import { z } from "zod";

export const createInstituicaoSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email("Formato de email inválido"),
  senha: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  telefone: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(10, "Telefone deve ter pelo menos 10 caracteres"),
  cnpj: z
    .string({ required_error: "CNPJ é obrigatório" })
    .min(14, "CNPJ deve ter pelo menos 14 caracteres"),
});
