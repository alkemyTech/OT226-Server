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

exports.decryptJWT = (header) => {
  const token = header.authorization
  try {
    const { id, firstName, roleId } = jwt.verify(token, process.env.JWT_KEY)
    return {
      id,
      firstName,
      roleId,
    }
  } catch (error) {
    const message = `[Token not provided or invalid] - [Access - Denied]: ${error.message}`
    return message
  }
}

exports.decodeJWT = (header) => {
  const token = header.authorization
  const { id, firstName, roleId } = jwt.decode(token)
  return {
    id,
    firstName,
    roleId,
  }
}
