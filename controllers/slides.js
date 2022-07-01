const createHttpError = require('http-errors')
const { getSlides, getSlideById, deleteSlide } = require('../services/slides')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getSlides()
      endpointResponse({
        res,
        message: 'slides retrieved successfully',
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
  getSlideById: catchAsync(async (req, res, next) => {
    try {
      const response = await getSlideById(req.params.id)
      endpointResponse({
        res,
        message: 'slide retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving slide] - [Slide - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteSlide(req.params.id)
      endpointResponse({
        res,
        message: 'slides deleted succesfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Slide] - [index - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
