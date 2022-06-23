const createHttpError = require('http-errors')

const { create, getNews, deleteNews } = require('../services/news')

const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    const { body } = req
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
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getNews(req.params.id)
      endpointResponse({
        res,
        message: 'new retrieved successfully',
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
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteNews(req.params.id)
      endpointResponse({
        res,
        message: 'new deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting new] - [new - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
