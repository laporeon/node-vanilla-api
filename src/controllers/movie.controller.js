const MovieService = require("../services/movie.service");
const buildResponse = require("../utils/response");
const HTTPStatus = require("../utils/httpStatus");

class MovieController {
  constructor(response) {
    this.response = response;
    this.movieService = new MovieService();
  }

  async createMovie(request) {
    const movie = await this.movieService.create(request);
    return buildResponse(this.response, HTTPStatus.CREATED, movie);
  }

  async getAllMovies() {
    const movies = await this.movieService.getMovies();
    return buildResponse(this.response, HTTPStatus.OK, movies);
  }

  async getMovieById(param = "") {
    const movie = await this.movieService.getMovieById(param);
    return buildResponse(this.response, HTTPStatus.OK, movie);
  }

  async updateMovie(request) {
    const movie = await this.movieService.update(request);
    return buildResponse(this.response, HTTPStatus.OK, movie);
  }

  async deleteMovie(param) {
    await this.movieService.delete(param);
    return buildResponse(this.response, HTTPStatus.NO_CONTENT, []);
  }
}

module.exports = MovieController;
