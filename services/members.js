const { ErrorObject } = require('../helpers/error')
const { Member } = require('../database/models')

exports.getMembers = async () => {
  try {
    const members = await Member.findAll()
    return members
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
