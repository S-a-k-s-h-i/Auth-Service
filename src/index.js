const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");

const UserService = require("./services/user-service");

const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
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
