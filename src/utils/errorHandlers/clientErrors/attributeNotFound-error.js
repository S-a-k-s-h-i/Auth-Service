const { StatusCodes } = require("http-status-codes");
const AppErrors = require("../app-error");

class AttributeNotFound extends AppErrors {
  constructor(name) {
    error = {
      name: "AttributeNotFound",
      message: `Invalid ${name} sent in the request`,
      explanation: `Please check the ${name} as there is no record of ${name}`,
      statusCode: StatusCodes.NOT_FOUND,
    };

    super(error.name, error.message, error.explanation, error.statusCode);
  }
}

module.exports = AttributeNotFound;
