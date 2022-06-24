const jwt = require('jsonwebtoken')
const { endpointResponse } = require('../helpers/success')

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

exports.verifyUsers = (req, res, next) => {
  const token = req.headers['auth-key']
  try {
    const response = jwt.verify(token, process.env.JWT_KEY)
    if (response) {
      next()
      return
    }
  } catch (error) {
    endpointResponse({
      res,
      message: 'token no validate',
      error,
    })
  }
}
