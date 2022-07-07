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

exports.createMember = async (req) => {
  try {
    const newMember = await Member.create(req.body)
    return newMember
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateMember = async (req) => {
  const { id } = req.params
  try {
    const searchMember = await Member.findOne({ where: { id } })
    if (!searchMember || searchMember.length === 0) throw new ErrorObject('Member not found', 404)

    const editMember = await Member.update(req.body, { where: { id } })
    return editMember
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
