const httpStatus = require("http-status");
const { validationResult } = require("express-validator");

class ErrorResponseService {
  static validationErrorResponse(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ success: false, errors: errors.array() });
  }

  static wrongCredentialsResponse(_req, res) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ success: false, message: "Incorrect email or password" });
  }
}

module.exports = ErrorResponseService;
