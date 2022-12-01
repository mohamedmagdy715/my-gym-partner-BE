const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { secretKey } = require("../constants");
const prisma = require("../api/repository");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
opts.passReqToCallback = true;

passport.use(
  new JwtStrategy(opts, function (req, jwtPayload, done) {
    // make sure jwt is not blacklisted (not logged out)
    const { authorization: token } = req.headers;
    prisma.blacklistedJWT
      .findUnique({ where: { value: token } })
      .then((blacklistedToken) => {
        if (blacklistedToken) {
          // it is blacklisted
          done(null, false);
        }
        // Finding user by id
        prisma.user
          .findUnique({
            where: {
              id: jwtPayload.id,
            },
          })
          .then((user) => {
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
      })
      .catch((err) => {
        done(err, false);
      });
  })
);
