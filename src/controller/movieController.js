import { prisma } from "../config/db.js"


const postMovieController = async (req, res) => {



    const { title, overview, rate, runtime, genres, releaseYear } = req.body

    try {


        const movieExist = await prisma.movie.findUnique({

            where: {
                createdBy_title: {

                    createdBy: req.user.id,
                    title
                }
            }

        })

        if (movieExist) return res.status(400).json({ message: "movie already exist in movie list" })




        const postMovie = await prisma.movie.create({

            data: {

                title,
                overview,
                rate,
                runtime,
                genres,
                releaseYear,
                createdBy: req.user.id
            }

        })

        res.json({ message: postMovie })

    } catch (error) {

        console.error("error posting movie", error.message);
        res.status(500).json({ message: "internal server error" })

    }


}


const updateController = async (req, res) => {

    const { id } = req.params

    const { title, overview, runtime, releaseYear, genres } = req.body

    console.log(id)

    try {


        const movieExist = await prisma.movie.findUnique({

            where: { id }
        })

        if (!movieExist) return res.status(400).json({ message: "movie does not exist in movie list" })


        const doUpdate = await prisma.movie.update({

            where: { id },

            data: {

                title,
                overview,
                runtime,
                releaseYear,
                genres
            }

        })

        res.status(201).json({
            data: {

                status: "success",
                updatedState: doUpdate

            }
        })


    } catch (error) {

        console.error("error updating fields", error.message)
        res.status(500).json({ message: "internal server error" })
    }

}


const deleteController = async (req, res) => {

    const { id } = req.params


    try {


        const checkData = await prisma.movie.findUnique({
            where: { id }
        })

   

        if (!checkData) return res.status(400).json({ message: " Data already deleted" })



        await prisma.movie.delete({

            where: { id }
        })

        return res.json({ message: `entry with ${id} successfully deleted` })

    } catch (error) {

        console.error("error deleting data", error.message)
        return res.status(500).json({ message: "internal server error" })

    }




}





export { postMovieController, updateController, deleteController }