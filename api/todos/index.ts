import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { title } from "process";

const prisma = new PrismaClient()

const router = Router();

router.get("/", async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

router.get("/:id", async (req, res) => {
    const todo = await prisma.todo.findUnique({
        where: {
            id: +req.params.id
        }
    })
    res.json(todo)
})

router.post("/", async (req, res) => {
    await prisma.todo.create({
        data: {
            body: req.body.body,
            dueDate: req.body.dueDate,
            title: req.body.title,
            userId: 1,
        }
    })
    
    res.json({success: true});
});

// + coerces string into number same as parseint
router.patch("/:id", async (req, res) => {
    await prisma.todo.update({
        where: {
            // id: parseInt(req.params.id)
            id: +req.params.id
        },
        data: {
            body: req.body.body,
            dueDate: req.body.dueDate,
            title: req.body.title,
            isComplete: req.body.isComplete
        }
    })

    res.json({success: true})
})

router.delete("/:id", async (req, res) => {
    await prisma.todo.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.json({success: true})
})


export default router;