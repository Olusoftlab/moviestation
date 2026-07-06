import express from "express"
import { getMovies, updateMovies, postMovies, deleteMovie } from "../controller/movieController.js"

const router = express.Router()

router.get("/", getMovies)
router.post("/", postMovies)
router.put("/", updateMovies)
router.delete("/", deleteMovie)



export default router