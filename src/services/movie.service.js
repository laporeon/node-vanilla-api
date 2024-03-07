const { randomUUID } = require("node:crypto");

const MovieRepository = require("../repositories/movie.repository");
const { NotFoundError, AlreadyRegisteredError } = require("../errors/errors");
const Validator = require("../utils/validator");

class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
    this.validator = new Validator();
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

          await this.validator.execute(parsedBody);

          const { title, year, genre, duration, ageRating, director } =
            parsedBody;

          const hasMovie = await this.movieRepository.getByTitle(title);

          if (hasMovie) {
            throw new AlreadyRegisteredError("Movie already registered.");
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

  async getMovies() {
    const movies = await this.movieRepository.get();

    return movies;
  }

  async getMovieById(param) {
    const movie = await this.movieRepository.getByID(param);

    if (!movie) {
      throw new NotFoundError();
    }

    return movie;
  }

  async update(request) {
    return new Promise((resolve, reject) => {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });

      request.on("end", async () => {
        try {
          const id = request.url.split("/")[2] || "";

          const hasMovie = await this.movieRepository.getByID(id);

          if (!hasMovie) {
            throw new NotFoundError();
          }

          const parsedBody = JSON.parse(body);

          await this.validator.execute(parsedBody);

          const { title, year, genre, duration, ageRating, director } =
            parsedBody;

          const updatedMovie = {
            id,
            title,
            year,
            genre,
            duration,
            ageRating,
            director,
          };

          await this.movieRepository.update(updatedMovie);

          resolve(updatedMovie);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async delete(param) {
    const movie = await this.movieRepository.getByID(param);

    if (!movie) {
      throw new NotFoundError();
    }

    await this.movieRepository.delete(movie);

    return [];
  }
}

module.exports = MovieService;
