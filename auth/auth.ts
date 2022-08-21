import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { hash,genSalt, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();


router.post("/signup", async (req, res) => {
    const hashed = await hash(req.body.password, 10);
    // const salt = await genSalt(10);
    // const hashed = await hash(req.body.password, salt);

    await prisma.user.create({
        data: {
            password: hashed,
            username: req.body.username,
        }
    })
    res.json({success: true});
})


router.post("/login", async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })

    if(user) {
        const passwordsMatch = await compare(req.body.password, user.password);
        if (passwordsMatch) {
            // sign token and send back
            // secret string should be generated and hidden in environment
            const token = jwt.sign({userId: user.id}, "SOME_BIG_SECRET", {expiresIn: "1d"});
            res.json({token});
            return;
        }
    }
    res.status(401).json({message: "access denied"});
})
export default router;