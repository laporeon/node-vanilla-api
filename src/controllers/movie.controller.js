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

  async getMovieById(param = "") {
    const movie = await this.movieService.getMovieById(param);
    return generateResponse(this.response, 200, movie);
  }

  async createMovie(request) {
    const movie = await this.movieService.create(request);
    return generateResponse(this.response, 201, movie);
  }
}

module.exports = MovieController;
