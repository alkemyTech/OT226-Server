const { ErrorObject } = require('../helpers/error')
const { Member } = require('../database/models')

exports.createMember = async (req) => {
  try {
    const newMember = await Member.create(req.body)
    return newMember
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
