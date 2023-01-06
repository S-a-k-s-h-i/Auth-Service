const AppError = require("./error-handlers");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppError {
  constructor(error) {
    let errorName = error.name;
    let errorExplanation = [];
    error.errors.forEach((err) => {
      errorExplanation.push(err.message);
    });

    super(
      errorName,
      "Not able to validate the data sent in the request",
      errorExplanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;
