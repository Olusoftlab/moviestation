
const getMovies = async (req, res) => {

    res.send("get all movies")

}

const postMovies = async (req, res) => {

    res.send("post all movies")

}

const updateMovies = async (req, res) => {

    res.send("Update all movies")

}

const deleteMovie = async (req, res) => {

    res.send("delete a movie")
}


export { deleteMovie, getMovies, postMovies, updateMovies }