const { hashSync } = require("bcrypt");
const { PrismaError } = require("prisma-error-enum");
const httpStatus = require("http-status");

const prisma = require("../../repository");
const { sanitizeEmailAddress } = require("../../utils/utils");
const authService = require("../../services/auth.service");

module.exports = (req, res, next) => {
  const emailAddress = sanitizeEmailAddress(req.body.email);
  prisma.user
    .create({
      data: {
        email: emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashSync(req.body.password, 10),
      },
    })
    .then((user) => {
      delete user.password;

      // Sending JWT in the response
      res.send({
        success: true,
        user,
        token: authService.generateJWT(user),
      });
    })
    .catch((err) => {
      if (
        err.code === PrismaError.UniqueConstraintViolation &&
        err.meta.target[0] === "email"
      ) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "This account is already registered",
        });
      }
      next(err);
    });
};
