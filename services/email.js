const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = async (product) => {

  const { name, price, shipping } = product

  const msg = {
    to: 'example@gmail.com',
    from: 'sender@outlook.com',
    subject: 'New Order - Sending with SendGrid is Fun',
    text: `Item name ${name}, unit price is ${price}, shipping is ${shipping}`,
    html: `<strong>Item name ${name}, unit price is ${price}, shipping is ${shipping}</strong>`,
  }

  await sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}


