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

exports.deleteTestimonial = async (idTestimonial) => {
  try {
    const testimonial = await Testimonial.destroy({ where: { id: idTestimonial } })
    if (!testimonial || testimonial.length === 0) {
      throw new ErrorObject('No index found', 404)
    }
    return testimonial
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
