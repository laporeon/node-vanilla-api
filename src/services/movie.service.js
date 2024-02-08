const MovieRepository = require("../repositories/movie.repository");

class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
  }

  async getMovies() {
    // TODO: Error Handler
    const movies = await this.movieRepository.get();

    return movies;
  }

  async getMovieById(param) {
    // TODO: Error Handler
    const movie = await this.movieRepository.findById(param);

    return movie;
  }
}

module.exports = MovieService;
