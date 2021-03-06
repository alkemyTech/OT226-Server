const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  updateTestimonial,
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
} = require('../services/testimonials')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getTestimonials(req)
      endpointResponse({
        res,
        message: 'testimonials retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving testimonials] - [testimonials - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    const { body } = req
    const { id } = req.params
    try {
      const testimonial = await updateTestimonial(body, id)
      endpointResponse({
        code: 200,
        res,
        body: testimonial,
        message: 'Testimonial successfully updated',
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating testimonial] - [testimonial - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const response = await createTestimonial(req.body)
      endpointResponse({
        res,
        message: 'Testimonial created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating testimonial] - [testimonial - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteTestimonial(req.params.id)
      endpointResponse({
        res,
        message: 'Testimonial deleted succesfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Testimonial] - [index - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
