const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models')

// example of a service
exports.getOrganizations = async () => {
  try {
    const redes = {
      facebook: 'https://facebook/test_1',
      instagram: 'https://instagram/test_1',
      tweter: 'https://tweter/test_1',
    }
    const getOrganizations = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address'],
    })
    if (!getOrganizations) {
      throw new ErrorObject('No index found', 404)
    }
    return { getOrganizations, redes }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.putOrganization = async (id, body) => {
  try {
    const organization = await Organization.findByPk(id)
    if (!organization) {
      throw new ErrorObject('Organization not found', 404)
    } else {
      const organizationUpdated = await Organization.update(body, { where: { id } })
      return organizationUpdated
    }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
