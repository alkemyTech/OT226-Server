const { ErrorObject } = require('../helpers/error')
const { Testimonial } = require('../database/models')

// example of a service

exports.updateTestimonial = async (body, id) => {
  try {
    const testimonial = await Testimonial.findOne({
      where: { id },
    })
    if (!testimonial) {
      throw new ErrorObject('Testimonial not found', 404)
    }
    await Testimonial.update(body, {
      where: { id },
    })
    return testimonial
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.createTestimonial = async (body) => {
  try {
    const testimonial = await Testimonial.create(body)
    return testimonial
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
