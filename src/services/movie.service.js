const { randomUUID } = require("node:crypto");
const http = require("node:http");

const MovieRepository = require("../repositories/movie.repository");
const {
  NotFoundError,
  RequiredFieldError,
  InvalidInputError,
} = require("../errors/errors");

class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
  }

  async getMovies() {
    const movies = await this.movieRepository.get();

    return movies;
  }

  async getMovieById(param) {
    const movie = await this.movieRepository.findById(param);

    if (!movie) {
      throw new NotFoundError(param);
    }

    return movie;
  }

  async create(request) {
    return new Promise((resolve, reject) => {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });

      request.on("end", async () => {
        try {
          const parsedBody = JSON.parse(body);

          const { name, year, director } = parsedBody;

          if (!name || !year || !director) {
            throw new RequiredFieldError();
          }

          if (!Number.isInteger(year)) {
            throw new InvalidInputError("Year must be an integer number.");
          }

          const movie = {
            id: randomUUID(),
            name,
            year,
            director,
          };

          await this.movieRepository.create(movie);

          resolve(movie);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

module.exports = MovieService;
