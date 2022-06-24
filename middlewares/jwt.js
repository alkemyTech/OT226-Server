const jwt = require('jsonwebtoken')

exports.createJWT = (req, res, next) => {
  const { id, firstName, roleId } = req.body
  const payload = {
    id,
    firstName,
    roleId,
  }
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '1h',
  })
  req.body = { ...req.body, token }
  next()
}

exports.validateJWT = (token) => jwt.verify(token, process.env.JWT_KEY)
