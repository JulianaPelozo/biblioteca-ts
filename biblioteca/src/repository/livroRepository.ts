import { AppDataSource } from "../data-source";
import { Livro } from "../entity/livro";

export const LivroRepository = AppDataSource.getRepository(Livro);
