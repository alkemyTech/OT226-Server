const { sendEmailTo } = require('../services/email')
const { getOrganizations } = require('../services/organization')

module.exports = {
  welcomeEmail: async (user) => {
    try {
      const [organization] = await getOrganizations()
      const {
        image, name, phone, email,
      } = organization
      const data = {
        img: image,
        name,
        contact: `${phone} - ${email}`,
        subject: `welcome to ${name}`,
      }

      // here we use the email service
      await sendEmailTo(user.email, data)
    } catch (error) {
      console.error(error) // eslint-disable-line
    }
  },
}
