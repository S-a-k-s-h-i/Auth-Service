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

const validateIsAdminRequest = (req, res, next) => {
  if (!req.query.id) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error: "User Id is missing",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateIsAdminRequest,
};
