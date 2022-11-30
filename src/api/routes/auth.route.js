const express = require("express");

const authController = require("../controllers/auth/auth.controller");

const router = express.Router();

// GET /auth/users
// router.get("/users", authController.getUsers);
router.route("/users").get(authController.getUsers);

module.exports = router;
