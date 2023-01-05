const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user-repository");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wront in the service layer");
      throw error;
    }
  }

  async get(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      return user;
    } catch (error) {
      console.log("Something went wront in the service layer");
      throw error;
    }
  }

  async createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: 30 });
      return token;
    } catch (error) {
      console.log("Something went wrong while creating a token");
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
      console.log("Something went wrong while verifying the token");
      throw error;
    }
  }
}

module.exports = UserService;
