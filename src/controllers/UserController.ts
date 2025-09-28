import { Request, Response } from "express";
import { createUserSchema } from "@/schemas/UserSchema";

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { body } = createUserSchema.parse(req);

    // Adicione aqui a lógica para salvar os dados (ex: em um banco de dados)
    console.log("User data validated:", body);

    return res.status(201).json({
      message: "User created successfully!",
      user: {
        name: body.name,
        email: body.email
      }
    });
  }
}

export default new UserController();
