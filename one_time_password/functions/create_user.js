const admin = require('firebase-admin');

// https://console.firebase.google.com/u/0/project/react-native-course-2797e/authentication/providers

module.exports = (req, res) => {
  // verify the user provided a phone number
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // format the phone number to remove dashes and parens
  // replace every character that it's not a digit
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  // create a new user account using that phone number
  // respond to the user request, saying the account was made
  admin.auth().createUser({ uid: phone })
    .then((user) => res.send(user))
    .catch((err) => res.status(422).send({ error: err }));
}
