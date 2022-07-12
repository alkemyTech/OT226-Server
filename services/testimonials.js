const { ErrorObject } = require('../helpers/error')
const { Testimonial } = require('../database/models')

exports.getTestimonials = async (req) => {
  const { page = 1 } = req.query

  const getUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`

  const options = {
    limit: 10,
    offset: (+page > 0 ? (+page - 1) : 0) * 10,
  }

  try {
    const { count, rows: testimonials } = await Testimonial.findAndCountAll(options)
    const totalPages = Math.ceil(count / options.limit)

    if (totalPages < page) throw new ErrorObject('Testimonials not found', 404)

    return {
      prev: (page > 1) ? `${getUrl}?page=${+page - 1}` : null,
      next: (page < totalPages) ? `${getUrl}?page=${+page + 1}` : null,
      currentPage: page,
      totalPages,
      testimonials,
    }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

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
