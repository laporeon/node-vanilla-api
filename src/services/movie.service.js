const { randomUUID } = require("node:crypto");
const http = require("node:http");

const MovieRepository = require("../repositories/movie.repository");
const {
  NotFoundError,
  RequiredFieldError,
  InvalidInputError,
  AlreadyRegisteredError,
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
      throw new NotFoundError();
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

          const { title, year, genre, duration, ageRating, director } =
            parsedBody;

          if (
            !title ||
            !year ||
            !genre ||
            !duration ||
            !ageRating ||
            !director
          ) {
            throw new RequiredFieldError();
          }

          // TODO: find a better way to validate all the required fields

          if (!Number.isInteger(year)) {
            throw new InvalidInputError("Year must be type number.");
          }

          if (!Number.isInteger(ageRating)) {
            throw new InvalidInputError("Age Rating must be type number.");
          }

          if (!Number.isInteger(duration)) {
            throw new InvalidInputError(
              "Movie duration must be type number and sent in minutes format e.g 146"
            );
          }

          const hasMovie = await this.movieRepository.findByTitle(title);

          if (hasMovie) {
            throw new AlreadyRegisteredError();
          }

          const movie = {
            id: randomUUID(),
            title,
            year,
            genre,
            duration,
            ageRating,
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

  async delete(param) {
    const movie = await this.movieRepository.findById(param);

    if (!movie) {
      throw new NotFoundError();
    }

    await this.movieRepository.delete(movie);

    return [];
  }
}

module.exports = MovieService;
