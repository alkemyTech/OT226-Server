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
