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

exports.deleteMember = async (idMember) => {
  try {
    const members = await Member.destroy({ where: { id: idMember } })
    if (!members || members.length === 0) {
      throw new ErrorObject('No member found', 404)
    }
    return members
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
