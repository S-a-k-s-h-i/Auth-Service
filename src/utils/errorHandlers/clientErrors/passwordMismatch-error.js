const { StatusCodes } = require("http-status-codes");
const AppError = require("../app-error");

class PasswordMismatchError extends AppError {
  constructor() {
    let error = {
      name: "PasswordMismatchError",
      message: "Password not Matching, please try again",
      explanation: "Incorrect Password Entered",
      statusCode: StatusCodes.FORBIDDEN,
    };
    super(error.name, error.message, error.explanation, error.statusCode);
  }
}

module.exports = PasswordMismatchError;
