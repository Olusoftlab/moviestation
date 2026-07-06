import express from "express"
import { addToWatchList, deleteFromWatchList, updateWatchList } from "../controller/addToWatchListController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"


const router = express.Router()

router.use(authMiddleware)


router.post("/", addToWatchList)

router.delete("/:id", deleteFromWatchList);

router.put("/:id", updateWatchList)

export default router