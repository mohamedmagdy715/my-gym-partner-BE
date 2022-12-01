const express = require("express");

const {
  signUpValidator,
  signInValidator,
} = require("../validations/auth.validation");

const AuthService = require("../services/auth.service");
const signUpController = require("../controllers/auth/signUp.controller");
const signInController = require("../controllers/auth/signIn.controller");
const signOutController = require("../controllers/auth/signOut.controller");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUpController);
router.route("/signin").post(signInValidator, signInController);
router.route("/signout").delete(AuthService.authenticated(), signOutController);

module.exports = router;
