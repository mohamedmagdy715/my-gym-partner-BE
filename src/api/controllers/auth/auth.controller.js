const prisma = require("../../repository");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};
