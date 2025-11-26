import express from "express";
import { AppDataSource } from "./data-source";
import { LivroController } from "./controller/livroController";

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("📚 Conectado ao MySQL!");

  app.post("/api/livros", LivroController.criar);
  app.get("/api/livros", LivroController.listarTodos);
  app.get("/api/livros/:id", LivroController.listarPorId);
  app.put("/api/livros/:id", LivroController.atualizar);
  app.delete("/api/livros/:id", LivroController.excluir);

  app.listen(3000, () => console.log("🚀 API rodando na porta 3000"));
});
