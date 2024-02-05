const MovieService = require("../services/movie.service");
const generateResponse = require("../utils/response");

class MovieController {
  constructor(response) {
    this.response = response;
    this.movieService = new MovieService();
  }

  async getAllMovies() {
    const movies = await this.movieService.getMovies();
    return generateResponse(this.response, 200, movies);
  }
}

module.exports = MovieController;
