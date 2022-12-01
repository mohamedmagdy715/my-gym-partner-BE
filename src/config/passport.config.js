const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { secretKey } = require("../constants");
const prisma = require("../api/repository");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

passport.use(
  new JwtStrategy(opts, function (jwtPayload, done) {
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
      })
      .catch((err) => {
        done(err, false);
      });
  })
);
