const { RequiredFieldError, InvalidInputError } = require("../errors/errors");

class Validator {
  async execute(fields) {
    const { title, year, genre, duration, ageRating, director } = fields;

    if (!title || !year || !genre || !duration || !ageRating || !director) {
      throw new RequiredFieldError();
    }

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
  }
}

module.exports = Validator;
