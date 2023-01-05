const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //Step1-> Fetch user using the email
      const user = await this.userRepository.getByEmail(email);
      //Step2-> Compare the plain password with encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: " Incorrect Password" };
      }
      //Step3-> If password match create a jwt token and return token back to the user
      const jwtToken = this.createToken({ id: user.id, email: user.email });
      return jwtToken;
    } catch (error) {
      console.log("Something went wrong while sign in");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) throw { error: "Invalid token" };
      const user = this.userRepository.getById(response.id);
      if (!user) throw { error: "No user with the corresponding token exists" };
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  async createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
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

  async checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong while comparing the password", error);
      throw error;
    }
  }
}

module.exports = UserService;
