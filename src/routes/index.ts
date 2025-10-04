import { Router, Request, Response } from "express";
import { PrismaInstituicaoRepository } from "@/database/repositories/PrismaInstituicaoRepository";
import { CreateInstituicaoUseCase } from "@/use-cases/registrar/create-instituicao";
import { InstituicaoController } from "@/controllers/InstituicaoController";

const routes = Router();

routes.get("/health", (req, res) => res.json({ status: "ok" }));

routes.post("/api/registrar", async (req: Request, res: Response) => {
  const instituicaoRepository = new PrismaInstituicaoRepository();
  const createInstituicaoUseCase = new CreateInstituicaoUseCase(
    instituicaoRepository
  );
  const instituicaoController = new InstituicaoController(
    createInstituicaoUseCase
  );

  const { status, body } = await instituicaoController.handle(req);
  res.status(status).json(body);
});

export default routes;
