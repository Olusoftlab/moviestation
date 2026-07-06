import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js"


const authMiddleware = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        token = req.headers.authorization.split(" ")[1]

    } else if (req.cookies?.jwt) {

        token = req.cookies?.jwt

    }


    try {

        if (!token) return res.status(401).json({ message: "user not authorized" })

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await prisma.user.findUnique({

            where: { id: decoded.id }
        })


        if (!user) return res.status(401) / json({ message: "user no longer exist" })

        req.user = user

        next()

    } catch (error) {
        console.error("error verifying user")
    }



}

export { authMiddleware }