const { ErrorObject } = require('../helpers/error')
const { Activity } = require('../database/models')

// example of a service
exports.createActivity = async (name) => {
  try {
    const createActivity = await Activity.create(name)
    return createActivity
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateActivity = async (body, id) => {
  try {
    const activity = await Activity.findOne({
      where: { id },
    })
    if (!activity) {
      throw new ErrorObject('Activity not found', 404)
    }
    await Activity.update(body, {
      where: { id },
    })
    return activity
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
