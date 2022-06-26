
const { Model } = require('objection');
const { database } = require('../../config/knex');

// Give the knex object to objection.
Model.knex(database);

const Product = require('../models/product.model');

const { reply } = require('../../services/respond')
const { sendEmail } = require('../../services/email')

exports.receiveMessage = async (req, res, next) => {

  // extract messaging object
  const { messaging } = req.body.entry[0]
  
  // extract msg
  const { message } = messaging[0]
  
  // extract sender in order to use when replying back
  const { sender } = messaging[0]
  
  const greetings = ['hi', 'hello', 'good morning']
  const greetingsAnswers = ['How are you?', `I hope you're doing well.`, `I hope you're having a great day.`]

  let msg = ''

  if (greetings.includes(message.text.toLowerCase())) {
    // pick random answer
    msg = greetingsAnswers[Math.floor(Math.random()*greetingsAnswers.length)] 
  }

  if (['/desc', '/price', '/shipping', '/buy'].includes(message.text.split(' ')[0].toLowerCase())) {
    const product = await Product.query().select('description', 'name', 'price', 'shipping').where('sku', message.text.split(' ')[1]).first()

    switch(message.text.split(' ')[0].toLowerCase()) {
      case '/desc':
        msg = product.description
        break;
      case '/price':
        msg = product.price
        break;
      case '/shipping':
        msg = product.shipping
        break;
      case '/buy':
        await sendEmail(product)
        msg = 'Order email sent'
        break;
    }
  }

  if (msg === '') {
    msg = `Sorry I didn't understand!`
  }

  await reply(sender, msg)

  res.sendStatus(200);
}