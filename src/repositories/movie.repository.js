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

    await fs.writeFile(this.file, `\n${id};${name};${year};${director}`, {
      flag: "a",
      encoding: "utf8",
    });
  }

  async delete(movie) {
    const fileContent = await fs.readFile(this.file, "utf-8");

    let data = fileContent.split("\n");

    const indexToRemove = data.findIndex((line) => line.startsWith(movie.id));

    data.splice(indexToRemove, 1);

    await this.rewrite(data);
  }

  async rewrite(data) {
    await fs.writeFile(this.file, data.join("\n"));
  }
}

module.exports = MovieRepository;
