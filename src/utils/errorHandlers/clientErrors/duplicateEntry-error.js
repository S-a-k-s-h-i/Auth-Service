const { StatusCodes } = require("http-status-codes");
const AppError = require("../app-error");

class DuplicateEntry extends AppError {
  constructor(error) {
    let errorName = error.name;

    let message = error.errors[0].message;

    let explanation = error.parent.sqlMessage;

    super(errorName, message, explanation, StatusCodes.BAD_REQUEST);
  }
}

module.exports = DuplicateEntry;
