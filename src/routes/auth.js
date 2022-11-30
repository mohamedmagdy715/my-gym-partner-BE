const express = require("express");

const authController = require("../api/controllers/auth");

const router = express.Router();

// GET /auth/users
router.get("/users", authController.getUsers);

module.exports = router;
