const { compareSync } = require("bcrypt");
const { PrismaError } = require("prisma-error-enum");
const httpStatus = require("http-status");

const prisma = require("../../repository");
const { sanitizeEmailAddress } = require("../../utils/utils");
const authService = require("../../services/auth.service");
const errorService = require("../../services/error_response.service");

module.exports = (req, res, next) => {
  const emailAddress = sanitizeEmailAddress(req.body.email);
  const { rememberMe } = req.body;
  prisma.user
    .findUnique({
      where: {
        email: emailAddress,
      },
    })
    .then((user) => {
      // email not found or password is wrong
      if (!user || !compareSync(req.body.password, user.password)) {
        return errorService.wrongCredentialsResponse(req, res);
      }

      delete user.password;

      // Sending JWT in the response
      res.send({
        success: true,
        user,
        token: authService.generateJWT(user),
      });
    })
    .catch((err) => {
      next(err);
    });
};
