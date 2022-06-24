const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { getUserById } = require('../services/users')

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req)
    const { id } = await jwt.decode(token)

    if (!getUserById(id)) {
      const error = new Error()
      const httpError = createHttpError(
        (error.statusCode = 403),
        `[Unauthorized - User] - [Permissions - denied]: ${error.message}`,
      )
      next(httpError)
    }
    next()
  } catch (error) {
    const httpError = createHttpError(
      (error.statusCode = 403),
      `[Token not provided] - [Access - Denied]: ${error.message}`,
    )
    next(httpError)
  }
}
