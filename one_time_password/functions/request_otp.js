const admin = require('firebase-admin');
const twilio = require('./twilio');

// requesting one code to be sent to the user

module.exports = (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number.' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  // in this case, the parameter is the uid (the phone in this case)
  admin.auth().getUser(phone)
    .then(() => {
      // generate the code
      const code = Math.floor(Math.random() * 8999 + 1000);

      // send the message
      twilio.messages.create({
        body: `Your code is ${code}`,
        to: `+${phone}`,
        from: '+15617695697',
        messagingServiceSid: 'MGc7428cfec28e4bb25d20358c44db237f',
      }, (err) => {
        if (err) return res.status(500).send({ error: err, phone });

        // save code to firestore database
        admin.database().ref(`users/${phone}`)
          .update({ code, codeValid: true }, ((err) => {
            if (err) res.status(422).send({ error: err, phone });
            else res.send({ success: true });
          }));
      });
    })
    .catch((err) => res.status(422).send({ error: err, msg: 'Error when logging.', phone }));
}
