import express from "express"
import { getMoviesController } from "../controller/getMoviesController.js"
const router = express.Router()

router.get("/", getMoviesController)



export default router