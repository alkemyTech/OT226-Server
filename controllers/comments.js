const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createComment } = require('../services/comments')

// example of a controller. First call the service, then build the controller method
module.exports = {
  post: catchAsync(async (req, res, next) => {
    const { body } = req
    try {
      const response = await createComment(body)
      endpointResponse({
        code: 201,
        res,
        message: 'Comment successfully created',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating comment] - [comment - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
