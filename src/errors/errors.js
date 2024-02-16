class RequiredFieldError extends Error {
  constructor(statusCode = 400, contentType = "application/json") {
    super("Missing one or more required fields!");
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "RequiredFieldError";
  }
}

class NotFoundError extends Error {
  constructor(statusCode = 404, contentType = "application/json") {
    super("Resource not found.");
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "NotFoundError";
  }
}

class InvalidInputError extends Error {
  constructor(message, statusCode = 400, contentType = "application/json") {
    super(message);
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
    this.name = "InvalidInputError";
  }
}

module.exports = {
  RequiredFieldError,
  NotFoundError,
  InvalidInputError,
};
