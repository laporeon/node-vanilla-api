const { RequiredFieldError, InvalidInputError } = require("../errors/errors");

class Validator {
  constructor() {
    this.errors = [];
  }

  async execute(fields) {
    const { title, year, genre, duration, ageRating, director } = fields;

    if (!title || !year || !genre || !duration || !ageRating || !director) {
      throw new RequiredFieldError();
    }

    if (!Number.isInteger(year)) {
      this.errors.push("YEAR must be type number.");
    }

    if (!Number.isInteger(ageRating)) {
      this.errors.push("AGE REATING must be type number.");
    }

    if (!Number.isInteger(duration)) {
      this.errors.push(
        "DURATION must be type number and sent in minutes format e.g 146"
      );
    }

    if (this.errors.length > 0) {
      throw new InvalidInputError(this.errors.join(" "));
    }
  }
}

module.exports = Validator;
