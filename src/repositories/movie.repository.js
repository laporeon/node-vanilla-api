const path = require("node:path");
const fs = require("node:fs/promises");

class MovieRepository {
  constructor() {
    this.file = path.resolve(__dirname, "..", "data", "movies.json");
  }

  async get() {
    const data = await fs.readFile(this.file, "utf-8");
    return data;
  }
}

module.exports = MovieRepository;
