import { Router } from "express";
import UserController from "@/controllers/UserController";

const routes = Router();

routes.get("/health", (req, res) => res.json({ status: "ok" }));

routes.post("/users", UserController.store);

export default routes;
