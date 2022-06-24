const { validateJWT } = require('../helpers/jwt')

exports.verifyUsers = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    const response = await validateJWT(token)
    if (response) {
      next()
      return
    }
  } catch (error) {
    res.status(401).send({
      code: 401,
      message: `[Token not provided] - [Access - Denied]: ${error.message}`,
    })
  }
}
