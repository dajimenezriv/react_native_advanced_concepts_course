const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body.phone || !req.body.code) {
    return res.send(422).send({ error: 'Phone and code must be provided.' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref(`users/${phone}`);

      ref.on('value', (snapshot) => {
        ref.off() // stop listening as soon as we read one value
        const user = snapshot.val();
        if (user.code !== code || !user.codeValid)
          return res.status(422).send({ error: 'Code not valid.' });
        ref.update({ codeValid: false });
        // it needs the uid to create the token
        admin.auth().createCustomToken(phone)
          .then((token) => res.send({ token }))
          .catch((err) => res.status(422).send({ error: err, msg: 'Error while generating token.' }));
      });
    })
    .catch((err) => res.status(422).send({ error: err, msg: 'Error when logging.', phone }));
}
