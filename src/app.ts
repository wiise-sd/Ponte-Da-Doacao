import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config";
import "express-async-errors";
import routes from "@/routes";
import { ZodError } from "zod";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(routes);
  }

  private errorHandling(): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ZodError) {
          return res.status(400).json({
            message: "Validation error",
            issues: err.format(),
          });
        }

        console.error(err);

        return res.status(500).json({
          message: "Internal server error",
        });
      }
    );
  }
}

export default new App().app;
