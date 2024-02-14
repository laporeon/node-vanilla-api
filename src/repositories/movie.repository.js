const path = require("node:path");
const fs = require("node:fs/promises");

class MovieRepository {
  constructor() {
    this.file = path.resolve(__dirname, "..", "data", "movies.txt");
  }

  async get() {
    const fileContent = await fs.readFile(this.file, "utf-8");

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

  async findById(id) {
    const movies = await this.get();
    const movie = movies.find((m) => {
      if (m.id === id) return m;
    });
    return movie;
  }

  async create(movie) {
    const { id, name, year, director } = movie;

    await fs.appendFile(
      this.file,
      `\n${id};${name};${year};${director}`,
      "utf-8"
    );
  }
}

module.exports = MovieRepository;
