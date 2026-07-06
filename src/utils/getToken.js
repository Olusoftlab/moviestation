import jwt from "jsonwebtoken"

const getToken = (userId, res) => {

    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_IN || "2d" })


    res.cookie("jwt", token, {
        httpOnly: true, secure: process.env.NODE_ENV === "production" ? sameSite : "strict",
        maxAge: (1000 * 60 * 60 * 24) * 2
    })

    return token

}

export { getToken }