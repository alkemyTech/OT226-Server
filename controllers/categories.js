const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getCategories } = require('../services/categories')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getCategories()
      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
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
  getCategory: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await getCategories(id)
      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
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
