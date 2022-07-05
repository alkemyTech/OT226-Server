const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { updateTestimonial } = require('../services/testimonials')

// example of a controller. First call the service, then build the controller method
module.exports = {
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
}
