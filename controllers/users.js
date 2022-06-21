const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getUsers, registerUser } = require('../services/users')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await getUsers()
      endpointResponse({
        res,
        message: 'Users list retrieved successfully',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users list] - [users - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const users = await registerUser(req.body)
      endpointResponse({
        res,
        message: 'Users created successfully',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [users - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
