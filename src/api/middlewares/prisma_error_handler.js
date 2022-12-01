const { Prisma } = require('@prisma/client')
const httpStatus = require('http-status')

const prismaErrorsHandler = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const response = {
      success: false,
      errors: err
    }
    res.status(httpStatus.UNPROCESSABLE_ENTITY)
    res.send(response)
  } else {
    next(err)
  }
}

module.exports = prismaErrorsHandler
