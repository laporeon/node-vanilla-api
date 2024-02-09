const { randomUUID } = require("node:crypto");

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

  async create(body) {
    // TODO: Error Handler and body validations!
    const { name, year, director } = body;

    const movie = {
      id: randomUUID(),
      name,
      year,
      director,
    };

    await this.movieRepository.create(movie);

    return movie;
  }
}

module.exports = MovieService;
