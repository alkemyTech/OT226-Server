const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const user = await jwt.verify(token, process.env.JWT_KEY)
    if (user.roleId !== 2) {
      const error = new Error()
      const httpError = createHttpError(
        error.statusCode = 401,
        `[Unauthorized - User] - [Permissions - denied]: ${error.message}`,
      )
      next(httpError)
    }
    next()
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode = 401,
      `[Token not provided] - [Access - Denied]: ${error.message}`,
    )
    next(httpError)
  }
}
