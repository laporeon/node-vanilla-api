const path = require("node:path");
const fs = require("node:fs/promises");

class MovieRepository {
  constructor() {
    this.file = path.resolve(__dirname, "..", "data", "movies.txt");
  }

  async create(movie) {
    const { id, title, year, genre, duration, ageRating, director } = movie;

    await fs.writeFile(
      this.file,
      `\n${id};${title};${year};${genre};${ageRating};${duration};${director}`,
      {
        flag: "a",
        encoding: "utf8",
      }
    );
  }

  async get() {
    const fileContent = await fs.readFile(this.file, "utf-8");

    const data = fileContent.split("\n").splice(1);

    if (!data) return [];

    const movies = data.map((movie) => {
      const [id, title, year, genre, duration, ageRating, director] =
        movie.split(";");

      return {
        id,
        title,
        year: parseInt(year),
        genre,
        duration: parseInt(duration),
        ageRating: parseInt(ageRating),
        director,
      };
    });

    return movies;
  }

  async getByID(id) {
    const movies = await this.get();
    const movie = movies.find((m) => {
      if (m.id === id) return m;
    });
    return movie;
  }

  async update(movie) {
    const fileContent = await fs.readFile(this.file, "utf-8");

    let data = fileContent.split("\n");

    const indexToUpdate = data.findIndex((line) => line.startsWith(movie.id));

    const { id, title, year, genre, duration, ageRating, director } = movie;

    data.splice(
      indexToUpdate,
      1,
      `${id};${title};${year};${genre};${ageRating};${duration};${director}`
    );

    await this.overwrite(data);
  }

  async delete(movie) {
    const fileContent = await fs.readFile(this.file, "utf-8");

    let data = fileContent.split("\n");

    const indexToRemove = data.findIndex((line) => line.startsWith(movie.id));

    data.splice(indexToRemove, 1);

    await this.overwrite(data);
  }

  async overwrite(data) {
    await fs.writeFile(this.file, data.join("\n"));
  }

  async getByTitle(title) {
    const movies = await this.get();

    const movie = movies.find((m) => {
      if (m.title === title) return m;
    });

    return movie;
  }
}

module.exports = MovieRepository;
