import express from "express"
import { config } from "dotenv"
import { connectDb, prisma } from "./config/db.js"
import cookieParser from "cookie-parser"


//import router
import movieRouter from "./routes/movieRoute.js"
import authRouter from "./routes/authRoutes.js"
import watchListRouter from "./routes/watchListRoutes.js"

config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDb()

//define endpoint for each router

app.use("/movie", movieRouter)
app.use("/auth", authRouter)


app.use("/watchlist", watchListRouter)
const PORT = 5001 || 7000




app.listen(PORT, () => {

    console.log("Server running on port ", PORT)
})