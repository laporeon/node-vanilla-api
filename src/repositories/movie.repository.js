const path = require("node:path");
const fs = require("node:fs/promises");

class MovieRepository {
  constructor() {
    this.file = path.resolve(__dirname, "..", "data", "movies.json");
    this.file2 = path.resolve(__dirname, "..", "data", "movies.txt");
  }

  async get() {
    const fileContent = await fs.readFile(this.file2, "utf-8");

    const data = fileContent.split("\n").splice(1);

    if (!data) return [];

    const movies = data.map((movie) => {
      const [id, name, year, director] = movie.split(";");

      return {
        id,
        name,
        year: parseInt(year),
        director,
      };
    });

    return movies;
  }

  async findById(param) {
    const movies = await this.get();
    const movie = movies.filter((movie) => movie.id === Number(param));
    return movie;
  }

  async create(movie) {
    const { id, name, year, director } = movie;

    await fs.appendFile(
      this.file2,
      `\n${id};${name};${year};${director}`,
      "utf-8"
    );
  }
}

module.exports = MovieRepository;
