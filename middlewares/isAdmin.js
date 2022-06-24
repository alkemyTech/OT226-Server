const createHttpError = require('http-errors')

exports.isAdmin = async (req, res, next) => {
  try {
    const { roleId } = req.body.response
    if (roleId !== 2) throw new Error().message('Unauthorized - User')
    next()
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode = 401,
      `[Unauthorized - User] - [Access - Denied]: ${error.message}`,
    )
    next(httpError)
  }
}
