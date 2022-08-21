import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { title } from "process";

const prisma = new PrismaClient()

const router = Router();

router.get("/", async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

router.post("/", async (req, res) => {
    await prisma.todo.create({
        data: {
            body: req.body.body,
            dueDate: req.body.dueDate,
            title: req.body.title,

        }
    })
    
    res.json({success: true});
});

export default router;