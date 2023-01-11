const { StatusCodes } = require("http-status-codes");
class AppError extends Error {
  constructor(name, message, explanation, statusCode) {
    super();
    // this.name = "RepositoryError";
    this.name = name;
    // this.message = `Failed to ${service} ${name}`;
    this.message = message;
    // this.explanation = "There was some issue. Please try again later.";
    this.explanation = explanation;
    // this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
