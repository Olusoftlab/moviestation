import { prisma } from "../config/db.js"


const getMoviesController = async (req, res) => {

    const getAllMovies = await prisma.movie.findMany();

    res.json({ movies: getAllMovies })

}

export { getMoviesController };