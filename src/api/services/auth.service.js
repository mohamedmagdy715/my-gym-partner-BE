const jwt = require("jsonwebtoken");

const { secretKey } = require("../../constants");
const passport = require("passport");
const prisma = require("../repository");

class AuthService {
  static generateJWT(user, rememberMe) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payload, secretKey, {
      expiresIn: rememberMe ? "15 days" : "2 days",
    });
  }

  static authenticated() {
    return passport.authenticate("jwt", { session: false });
  }
}

module.exports = AuthService;
