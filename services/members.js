const { ErrorObject } = require('../helpers/error')
const { Member } = require('../database/models')

exports.getMembers = async (req) => {
  const getUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
  const page = Number.parseInt(req.query.page, 10) || 1
  const info = { next: null, prev: null }
  const limit = 10
  const offset = page > 0 ? (page - 1) * limit : 0
  if (page) {
    if (page > 1) {
      info.prev = `${getUrl}?page=${Number(page) - 1}`
      info.next = `${getUrl}?page=${Number(page) + 1}`
    } else {
      info.prev = null
      info.next = `${getUrl}?page=${Number(page) + 1}`
    }
  } else {
    info.prev = null
    info.next = `${getUrl}?page=2`
  }
  try {
    const { count, rows: members } = await Member.findAndCountAll({ offset, limit })
    const totalPages = Math.ceil(count / limit)
    if (totalPages < page || page === 0) throw new ErrorObject('News not found', 404)
    const allMembers = {
      prev: info.prev,
      next: `${totalPages > page ? info.next : null}`,
      currentPage: page,
      totalPages,
      members,
    }
    return allMembers
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
