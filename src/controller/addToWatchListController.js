import { prisma } from "../config/db.js"


const addToWatchList = async (req, res) => {

    const { movieId, status, rating, notes } = req.body

    try {

        const movie = await prisma.movie.findUnique({

            where: { id: movieId }
        })

        if (!movie) return res.status(400).json({ "message": "movie was not found" })

        const existInWatvhListItem = await prisma.watchListItem.findUnique({

            where: {
                userId_movieId: {

                    userId: req.user.id,
                    movieId

                }
            }
        })

        if (existInWatvhListItem) return res.status(400).json({ "message": "movie already exist in watch list" })

        const createWatchListItem = await prisma.watchListItem.create({

            data: {

                movieId,
                userId: req.user.id,
                status: status || "PLANNED",
                notes,
                rating,
            }
        })


        res.status(201).json({
            status: "success",
            data: {
                createWatchListItem
            }
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message || "internal server error" })
    }



}



const deleteFromWatchList = async (req, res) => {

    const requestId = req.params.id;

    if (!requestId) return res.status(401).json({ message: "delete operation can not be completed, bad request" })

    try {

        const watchListItem = await prisma.watchListItem.findUnique({

            where: { id: requestId }
        })

        if (!watchListItem) return res.status(404).json({ message: "watchlist item not found" })

        const deletedItem = await prisma.watchListItem.delete({

            where: { id: requestId }

        })


        res.json({
            message: {

                status: `Successfully deleted an item with ID ${requestId}`,
                data: { deletedItem }
            }
        })



    } catch (error) {

        res.status(500).json({ message: error.message})
    }




}


const updateWatchList = async (req, res) => {

    const requestId = req.params.id;

    const { status, notes, rating } = req.body


    try {

        const userExist = await prisma.user.findFirst({

            where: { id: req.user.id }
        })


        if (!userExist) return res.status(403).json({ message: "user forbidden" });


        const updateWatchList = await prisma.watchListItem.update({

            where: { id: requestId },

            data: {

                status,
                notes,
                rating

            }

        })


        res.json({
            message: {

                status: "Successfully update user with ID " + requestId,
                info: { updateWatchList }

            }
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }





}







export { addToWatchList, deleteFromWatchList, updateWatchList };