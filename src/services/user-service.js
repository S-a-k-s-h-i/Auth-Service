const UserRepository = require("../repositories/user-repository");

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
      const user = await this.userRepository.get(userId);
      return user;
    } catch (error) {
      console.log("Something went wront in the service layer");
      throw error;
    }
  }
}

module.exports = UserService;
