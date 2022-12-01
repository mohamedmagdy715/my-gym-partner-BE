const express = require("express");

const {
  signUpValidator,
  signInValidator,
} = require("../validations/auth.validation");

const signUpController = require("../controllers/auth/signUp.controller");
const signInController = require("../controllers/auth/signIn.controller");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUpController);
router.route("/signin").post(signInValidator, signInController);

module.exports = router;
