import express from "express"
import { postMovieController, deleteController, updateController} from "../controller/movieController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"


const router = express.Router()

router.use(authMiddleware)

router.post("/", postMovieController)

router.put("/:id",  updateController )

router.delete("/:id", deleteController)

export default router