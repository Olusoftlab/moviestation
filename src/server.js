import express from "express"
import { config } from "dotenv"
import { connectDb, disconnectDb } from "./config/db.js"
import cookieParser from "cookie-parser"


//import router
import movieRouter from "./routes/movieRoute.js"
import authRouter from "./routes/authRoutes.js"
import watchListRouter from "./routes/watchListRoutes.js"
import getMovieRoute from "./routes/getMovies.js"

config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDb()

//define endpoint for each router

app.use("/", getMovieRoute)
app.use("/movie", movieRouter)
app.use("/auth", authRouter)


app.use("/watchlist", watchListRouter)
const PORT = process.env.PORT || 7000




const server = app.listen(PORT, () => {

    console.log("Server running on port ", PORT)
})



process.on("unhandledRejection", (err) => {

    console.error("unhabdled rejection errror", err)

    server.close(async () => {

        await disconnectDb();
        process.exit(1);

    })
})


process.on("uncaughtException", (err) => {

    console.error("uncaught exception error", err.message);

    server.close(async () => {

        await disconnectDb();
        process.exit(1);

    })
})


process.on("SIGTERM", (err) => {

    console.log("error running app", err.message);
    server.close(async () => {

        await disconnectDb();
        process.exit(1)
    })


})

