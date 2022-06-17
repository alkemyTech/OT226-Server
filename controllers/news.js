const createHttpError = require('http-errors')
const { getIndex } = require('../services/index')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  getNews: get: catchAsync(async (req, res, next) => {
    try {
      const response = await getIndex('x')
      endpointResponse({
        res,
        message: 'Index retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  })
}
