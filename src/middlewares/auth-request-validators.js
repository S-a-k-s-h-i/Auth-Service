const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error: "Email or password is missing",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
};
