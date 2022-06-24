const createHttpError = require('http-errors')
const { validateJWT } = require('../helpers/jwt')
const { getUserById } = require('../services/users')

exports.verifyUsers = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    const response = await validateJWT(token)
    req.body.response = response
    next()
  } catch (error) {
    res.status(401).send({
      code: 401,
      message: `[Token not provided] - [Access - Denied]: ${error.message}`,
    })
  }
}

exports.isAuthenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    const { id } = await validateJWT(token)

    if (!getUserById(id)) {
      const error = new Error()
      const httpError = createHttpError(
        (error.statusCode = 403),
        `[Unauthorized User] - [Permissions Denied]: ${error.message}`,
      )
      next(httpError)
    }
    next()
  } catch (error) {
    const httpError = createHttpError(
      (error.statusCode = 403),
      `[Token not provided or invalid] - [Access - Denied]: ${error.message}`,
    )
    next(httpError)
  }
}
