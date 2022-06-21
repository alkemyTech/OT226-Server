const createHttpError = require('http-errors')

const { create } = require('../services/news')

const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    const { body } = req;
    try {
      const response = await create(body)
      endpointResponse({
        res,
        message: 'new created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating new] - [new - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
