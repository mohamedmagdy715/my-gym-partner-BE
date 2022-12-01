const { check } = require("express-validator");
const validationErrorHandler = require("../middlewares/validation_error_handler");

const strongPasswordConfig = {
  minLength: 8,
  minUppercase: 1,
  minLowercase: 0,
  minNumbers: 1,
  minSymbols: 1,
};
const strongPasswordMsg =
  "Password must be at least 8 characters, with at least one uppercase letter, one digit, one special character (!@#$%^&?*)";

exports.signUpValidator = [
  check("email").isEmail(),
  check("password", strongPasswordMsg).isStrongPassword(strongPasswordConfig),
  validationErrorHandler,
];
exports.signInValidator = [
  check(["email", "password"]).not().isEmpty(),
  validationErrorHandler,
];
