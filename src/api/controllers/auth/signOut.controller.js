const jwt = require("jsonwebtoken");

const prisma = require("../../repository");
const { secretKey } = require("../../../constants");

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;
  // substring to remove 'Bearer '
  const decodedToken = jwt.verify(token.substring(7, token.length), secretKey);
  // remove expired blacklisted jwts
  prisma.blacklistedJWT
    .deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    })
    .then(() => {});
  // add jwt to blacklist
  prisma.blacklistedJWT
    .create({
      data: {
        value: token,
        // convert from seconds to milliseconds
        expiresAt: new Date(decodedToken.exp * 1000),
      },
    })
    .then(() => {
      res.send({
        success: true,
      });
    })
    .catch((err) => {
      next(err);
    });
};
