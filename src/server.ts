import app from "@/app";
import { env } from "@/config/env";
import express from "express";
const PORT = env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
