const sgMail = require('@sendgrid/mail')
const read = require('fs')
const ejs = require('ejs')
const { join } = require('path')
/**
 *
 * @param {string} emailUser
 * @param {object} data - data contains the variables to send to welcome template
 */
exports.sendEmailTo = async (recipient, data, templatePath) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const sender = process.env.SENDGRID_VERIFIED_SENDER
  const str = read.readFileSync(join(__dirname, templatePath), 'utf-8')
  const body = ejs.render(str, data)
  const msg = {
    to: recipient,
    from: sender,
    subject: data.subject,
    text: data.text,
    html: body,
  }
  try {
    // send email
    await sgMail.send(msg)
    console.log('Email sent') // eslint-disable-line
  } catch (error) {
    console.error('here', error) // eslint-disable-line
  }
}
