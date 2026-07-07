import express from "express"
import { addToWatchList, deleteFromWatchList, updateWatchList } from "../controller/addToWatchListController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { addToWatchListSchema, updateListSchema } from "../validators/watchlistvalidators.js"
import { validateRequest } from "../middleware/validatemiddleware.js"



const router = express.Router()

router.use(authMiddleware)


router.post("/", validateRequest(addToWatchListSchema), addToWatchList)

router.delete("/:id", deleteFromWatchList);

router.put("/:id", validateRequest(updateListSchema), updateWatchList)

export default router