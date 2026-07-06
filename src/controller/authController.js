import bcrypt from "bcryptjs"
import { prisma } from "../config/db.js"
import { getToken } from "../utils/getToken.js"


const registerUser = async (req, res) => {

    const { name, email, password, gender } = req.body

    if (!name || !email || !password || !gender) {

        return res.status(400).json({ message: "all fields are required" })

    }

    try {

        const userExist = await prisma.user.findUnique({

            where: { email: email }

        })

        if (userExist) return res.status(400).json({ message: "User already exist" })


        const hashPassword = await bcrypt.hash(password, 10)



        const myUser = await prisma.user.create({
            data: {

                name: name,
                email: email,
                password: hashPassword,
                gender: gender
            }
        })

        const token = getToken(myUser.id, res)

        return res.status(200).json({
            message: {

                name,
                email,
                password: hashPassword,
                gender,
                token
            }
        })


    } catch (error) {
        console.error("internal server error", error.message)
    }

}


const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: "all fields are required" })

    try {

        const findUser = await prisma.user.findUnique({

            where: { email: email }

        })

        if (!findUser) return res.status(400).json({ message: "user with the email or passsword does not exist" })

        const confirmPassword = await bcrypt.compare(password, findUser.password)

        if (!confirmPassword) res.status(401).json({ message: "Unauthorized user" })

        const token = getToken(findUser.id, res)

        res.status(200).json({
            message: {

                data: {
                    id: findUser.id,
                    email,
                    password: findUser.password,
                    token
                }

            }
        })



    } catch (errror) {

        console.error("Internal server error", error.message)

    }



}


const logOutUser = async (req, res) => {

    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) })

    res.status(200).json({
        state: {

            status: "Success",
            message: "Successfully log out user"

        }
    })
}




export { registerUser, loginUser, logOutUser }
