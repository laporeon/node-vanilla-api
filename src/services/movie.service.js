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
}

module.exports = MovieService;
