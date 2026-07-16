import { prisma } from "../config/db.js"


const getMoviesController = async (req, res) => {

      try{
           
          const getAllMovies=await prisma.movie.findMany()

          res.json({movies:getAllMovies})

      }catch(error){

          console.error("error fetching movies", error)
           res.status(500).json({messgae:"internal server error"}) 
      }


}

export { getMoviesController };