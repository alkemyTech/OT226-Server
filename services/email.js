const sgMail = require('@sendgrid/mail')

exports.sendEmailTo = (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email, // Change to your recipient
    from: 'nicolas.altomonte@gmail.com', // Change to your verified sender
    subject: 'Email Sent with Sendgrid',
    text: 'OT226-28',
    html: '<strong>OT226-28</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent') // eslint-disable-line
    })
    .catch((error) => {
      console.error(error) // eslint-disable-line
    })
}
