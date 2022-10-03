const twilio = require('twilio');
const credentials = require('./twilio_account.json');

const { accountSid, authToken } = credentials;

module.exports = new twilio.Twilio(accountSid, authToken);
