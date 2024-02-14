class RequiredFieldError extends Error {
  constructor(statusCode = 400, contentType = "application/json") {
    super("Missing one or more required fields!");
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
  }
}

class NotFoundError extends Error {
  constructor(id, statusCode = 404, contentType = "application/json") {
    super(`No movie found with id: ${id}`);
    this.statusCode = statusCode;
    this.contentType = { "content-type": contentType };
  }
}

module.exports = {
  RequiredFieldError,
  NotFoundError,
};
