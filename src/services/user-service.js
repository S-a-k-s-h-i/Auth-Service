const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/user-repository");

const { JWT_KEY } = require("../config/serverConfig");
const ServiceError = require("../utils/errorHandlers/service-error");
const {
  TokenVerificationError,
  PasswordMismatchError,
} = require("../utils/errorHandlers/clientErrors/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "ValidationError" || error.name == "RepositoryError")
        throw error;
      throw new ServiceError();
    }
  }

  async get(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      return user;
    } catch (error) {
      if (error.name == "AttributeNotFound" || error.name == "RepositoryError")
        throw error;
      throw new ServiceError();
    }
  }

  async signIn(email, plainPassword) {
    try {
      //Step1-> Fetch user using the email
      const user = await this.userRepository.getByEmail(email);
      console.log(user);
      //Step2-> Compare the plain password with encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        throw new PasswordMismatchError();
      }
      //Step3-> If password match create a jwt token and return token back to the user
      const jwtToken = this.createToken({ id: user.id, email: user.email });
      return jwtToken;
    } catch (error) {
      if (error.name == "AttributeNotFound" || error.name == "RepositoryError")
        throw error;
      throw new ServiceError();
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) throw new TokenVerificationError();
      const user = await this.userRepository.getById(response.id);
      if (!user) throw new TokenVerificationError();
      return user.id;
    } catch (error) {
      if (
        error.name == "AttributeNotFound" ||
        error.name == "TokenVerificationError"
      )
        throw error;
      throw new ServiceError();
    }
  }

  async isAdmin(userId) {
    try {
      const response = this.userRepository.isAdmin(userId);
      return response;
    } catch (error) {
      if (error.name == "RepositoryError") throw error;
      throw new ServiceError();
    }
  }

  async createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return token;
    } catch (error) {
      console.log("Something went wrong while creating a token");
      throw new ServiceError();
    }
  }

  verifyToken(token) {
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
      if (error.name == "JsonWebTokenError") {
        throw new TokenVerificationError();
      }
      console.log("Something went wrong while verifying the token");
      throw new ServiceError();
    }
  }

  async checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong while comparing the password", error);
      throw new ServiceError();
    }
  }
}

module.exports = UserService;
