const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createActivity } = require('../services/activities')

// example of a controller. First call the service, then build the controller method
module.exports = {
  post: catchAsync(async (req, res, next) => {
    const { body } = req
    try {
      const response = await createActivity(body)
      endpointResponse({
        code: 201,
        res,
        message: 'Activity successfully created',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating activity] - [activity - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
