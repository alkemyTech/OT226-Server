const { ErrorObject } = require('../helpers/error')
const { Slide, sequelize } = require('../database/models')

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
