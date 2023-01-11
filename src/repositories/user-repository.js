const {
  ValidationError,
  AttributeNotFound,
} = require("../utils/errorHandlers/clientErrors/index");
const { User, Role } = require("../models/index");
const AppError = require("../utils/errorHandlers/app-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      delete user.password;
      return user;
    } catch (error) {
      // if (error.name == "SequelizeValidationError") {
      //   throw new ValidationError(error);
      // }
      // throw new AppError("user", "create");
      console.log(error);
      throw error;
    }
  }

  async getById(userId) {
    try {
      console.log(userId);
      const user = await User.findByPk(userId, {
        attributes: ["id", "email"],
      });
      console.log("user-----", user);
      if (!user) {
        throw new AttributeNotFound("userId");
      }
      return user;
    } catch (error) {
      throw new AppError("user", "fetch");
    }
  }

  async getByEmail(UserEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: UserEmail,
        },
      });
      if (!user) {
        throw new AttributeNotFound("email");
      }
      return user;
    } catch (error) {
      throw new AppError("user", "fetch");
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return await user.hasRole(adminRole);
    } catch (error) {
      throw new AppError("role", "check");
    }
  }

  async update(data, userId) {
    try {
      const user = await User.update(data, {
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new AppError("user", "update");
    }
  }

  async delete(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      throw new AppError("user", "delete");
    }
  }
}

module.exports = UserRepository;
