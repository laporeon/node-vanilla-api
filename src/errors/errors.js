const HTTPStatus = require("../utils/httpStatus");

class RequiredFieldError extends Error {
  constructor(
    statusCode = HTTPStatus.BAD_REQUEST,
    contentType = "application/json"
  ) {
    super("Missing one or more required fields!");
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "RequiredFieldError";
  }
}

class NotFoundError extends Error {
  constructor(
    statusCode = HTTPStatus.NOT_FOUND,
    contentType = "application/json"
  ) {
    super("Resource not found.");
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "NotFoundError";
  }
}

class InvalidInputError extends Error {
  constructor(
    message,
    statusCode = HTTPStatus.BAD_REQUEST,
    contentType = "application/json"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "InvalidInputError";
  }
}

// TODO: find a better name and a better message return for this error
class AlreadyRegisteredError extends Error {
  constructor(
    message,
    statusCode = HTTPStatus.CONFLICT,
    contentType = "application/json"
  ) {
    super("Movie already registered.");
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "AlreadyRegisteredError";
  }
}

module.exports = {
  RequiredFieldError,
  NotFoundError,
  InvalidInputError,
  AlreadyRegisteredError,
};
