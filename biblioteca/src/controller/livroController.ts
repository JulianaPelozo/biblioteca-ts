import { Request, Response } from "express";
import { LivroRepository } from "../repository/livroRepository";

export class LivroController {

    static async criar(req: Request, res: Response) {
        try {
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            if (!titulo || !autor || !isbn || !anoPublicacao) {
                return res.status(400).json({ erro: "Campos obrigatórios faltando" });
            }

            const livro = LivroRepository.create({
                titulo,
                autor,
                isbn,
                anoPublicacao,
                disponivel,
            });

            const salvo = await LivroRepository.save(livro);
            res.status(201).json(salvo);
        } catch (err) {
            res.status(500).json({ erro: "Erro ao criar livro" });
        }
    }

    static async listarTodos(req: Request, res: Response) {
        const livros = await LivroRepository.find();
        return res.json(livros);
    }

    static async listarPorId(req: Request, res: Response) {
        const { id } = req.params;

        const numId = Number(id);
        if (isNaN(numId)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const livro = await LivroRepository.findOneBy({ id: numId });

        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        return res.json(livro);
    }
    static async atualizar(req: Request, res: Response) {
        const { id } = req.params;

        const numId = Number(id);
        if (isNaN(numId)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const livro = await LivroRepository.findOneBy({ id: Number(id) });
        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        const dados = req.body;
        Object.assign(livro, dados);

        const atualizado = await LivroRepository.save(livro);

        return res.json(atualizado);
    }

    static async excluir(req: Request, res: Response) {
        const { id } = req.params;

        const numId = Number(id);
        if (isNaN(numId)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const livro = await LivroRepository.findOneBy({ id: Number(id) });
        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        await LivroRepository.delete(id);

        return res.json({ mensagem: "Livro removido com sucesso" });
    }
}
