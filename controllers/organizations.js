const createHttpError = require('http-errors')
const { getOrganizations, putOrganization } = require('../services/organization')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getOrganizations('x')
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
  put: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const {
        image,
        address,
        phone,
        name,
      } = req.body
      const body = {
        image,
        address,
        phone,
        name,
      }
      const response = await putOrganization(id, body)
      endpointResponse({
        res,
        message: 'Organizations retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
