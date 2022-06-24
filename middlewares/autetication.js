const { validateJWT } = require('../helpers/jwt')

exports.verifyUsers = async (req, res, next) => {
  const token = req.headers['auth-key']
  try {
    const response = await validateJWT(token)
    req.body.response = response
    next()
  } catch (error) {
    res.status(403).send({
      code: 403,
      message: 'token no validate',
    })
  }
}
