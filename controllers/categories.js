const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getAll } = require('../services/categories')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getAll()
      endpointResponse({
        res,
        message: 'Organizations retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
