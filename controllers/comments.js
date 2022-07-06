const createHttpError = require('http-errors')
const { getComments } = require('../services/comments')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getComments()
      endpointResponse({
        res,
        message: 'Comments retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Comments] - [Comments - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
