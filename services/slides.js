const { ErrorObject } = require('../helpers/error')
const { Slide, Organization } = require('../database/models')

// example of a service
exports.getSlides = async () => {
  try {
    const getSlides = await Slide.findAll()
    if (!getSlides || getSlides.length === 0) {
      throw new ErrorObject('No index found', 404)
    }
    return getSlides
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getSlideById = async (slideId) => {
  try {
    const getSlide = await Slide.findOne({
      where: { id: slideId },
      include: { model: Organization },
    })
    if (!getSlide) {
      throw new ErrorObject('No index found', 404)
    }
    return getSlide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteSlide = async (idSlide) => {
  try {
    const slide = await Slide.destroy({ where: { id: idSlide } })
    if (!slide || slide.length === 0) {
      throw new ErrorObject('No index found', 404)
    }
    return slide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
