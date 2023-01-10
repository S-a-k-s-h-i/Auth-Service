const { StatusCodes } = require("http-status-codes");
const AppError = require("../app-error");

class TokenVerificationError extends AppError {
  constructor() {
    let error = {
      name: "TokenVerificationError",
      message: "Invalid Token",
      explanation: "Incorrect Token Provided",
      statusCode: StatusCodes.FORBIDDEN,
    };
    super(error.name, error.message, error.explanation, error.statusCode);
  }
}

module.exports = TokenVerificationError;
