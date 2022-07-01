const { ErrorObject } = require('../helpers/error')
const { Slide, Organization, sequelize } = require('../database/models')

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

exports.createSlider = async (body) => {
  const {
    imageUrl, text, order, organizationId,
  } = body
  try {
    const count = await sequelize.query('SELECT count(*) FROM slides')
    const slides = await Slide.create({
      imageUrl,
      text,
      order: order !== undefined ? order : count[0][0]['count(*)'] + 1,
      organizationId,
    })

    return { slides }
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

exports.updateSlide = async (body, slideId) => {
  const {
    imageUrl, text, order, organizationId,
  } = body
  try {
    const slideExist = await Slide.findOne({ where: { id: slideId } })
    if (!slideExist) {
      throw new ErrorObject('No index found', 404)
    }
    const slide = await Slide.update(
      {
        imageUrl,
        text,
        order,
        organizationId,
      },
      { where: { id: slideId } },
    )
    return slide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
