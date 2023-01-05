const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");

const db = require("./models/index");
const { User, Role } = require("./models/index");

const UserService = require("./services/user-service");

const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
    //const u1 = await User.findByPk(4);
    //const r1 = await Role.findByPk(1);
    //u1.addRole(r1);
    //const res = await r1.getUsers();
    //const res = await u1.hasRole(r1);
    //const res = await u1.getRoles();
    //console.log(res);
    //const userService = new UserService();
    // const token = await userService.createToken({
    //   id: 1,
    //   email: "sakshi@gmail.com",
    // });
    // console.log("token", token);
    // const decode = await userService.verifyToken(token);
    // console.log("decoded", decode);
  });
};

prepareAndStartServer();
