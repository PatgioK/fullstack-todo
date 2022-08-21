import { Router } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

router.get("/", async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

router.post("/", async (req, res) => {
    prisma.todo.create({
        data: {
            body: req.body.body,
            
        }
    })
});

export default router;