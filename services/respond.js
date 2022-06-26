
const axios = require('axios').default;

exports.reply = async (recipient, text) => {
  axios.post(`https://graph.facebook.com/v14.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`, {
    recipient: {
      id: recipient.id
    },
    message: {
      text
    }
  })
  .then(function (response) {
    console.log(response.statusText);
  })
  .catch(function (error) {
    console.log(error);
  });
}

