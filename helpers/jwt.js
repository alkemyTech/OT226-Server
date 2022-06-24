const jwt = require('jsonwebtoken')

exports.createJWT = (body) => {
  const { id, firstName, roleId } = body
  const payload = {
    id,
    firstName,
    roleId,
  }
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '1h',
  })
  return token
}

exports.validateJWT = async (token) => jwt.verify(token, process.env.JWT_KEY)
