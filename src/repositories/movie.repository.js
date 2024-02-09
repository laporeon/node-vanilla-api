const path = require("node:path");
const fs = require("node:fs/promises");

class MovieRepository {
  constructor() {
    this.file = path.resolve(__dirname, "..", "data", "movies.json");
  }

  async get() {
    const movies = await fs.readFile(this.file, "utf-8");
    return JSON.parse(movies);
  }

  async findById(param) {
    const movies = await this.get();
    const movie = movies.filter((movie) => movie.id === Number(param));
    return movie;
  }
}

module.exports = MovieRepository;
