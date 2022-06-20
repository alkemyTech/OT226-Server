const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getUserList } = require('../services/users')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await getUserList() // call the service to get the list of users
      endpointResponse({
        res,
        code: 200,
        status: true,
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
