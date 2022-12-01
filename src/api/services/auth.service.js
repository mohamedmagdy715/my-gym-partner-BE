const jwt = require("jsonwebtoken");

const { secretKey } = require("../../constants");
const passport = require("passport");
const prisma = require("../repository");

class AuthService {
  static generateJWT(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payload, secretKey);
  }

  static authenticated() {
    return passport.authenticate("jwt", { session: false });
  }
}

module.exports = AuthService;
