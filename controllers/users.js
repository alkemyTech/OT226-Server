const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getUsers } = require('../services/users')

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
}
