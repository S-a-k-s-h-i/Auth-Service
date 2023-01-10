const { StatusCodes } = require("http-status-codes");
class AppError extends Error {
  constructor(name, service) {
    super();
    this.name = "RepositoryError";
    this.message = `Failed to ${service} ${name}`;
    this.explanation = "There was some issue. Please try again later.";
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = AppError;
