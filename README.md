# React Native Advanced Concepts Course

[Udemy Course](https://www.udemy.com/course/react-native-advanced/)
 
## Introduction

### Section 1: Expo Setup

Explanation of how React Native CLI and Expo CLI in a more deep way.

## Animation

Building the dragging system of Tinder cards.

### Section 2: Animations in React Native

Explanation of LayoutAnimation and Animated modules.<br>
Explanation of the workflow of the Animated module.

### Section 3: Handling Gestures

How to drag cards.

### Section 4: Applying Animation Styling

Rotate cards and force swipe.

### Section 5: Component Reusability

Stacking and cascading cards.

#### Most complex part

Deck.js
```javascript
import { useState } from 'react';
import { Animated, PanResponder, View, Dimensions, StyleSheet, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default function Deck({
  data,
  renderNoMoreCards,
  renderCard,
  onSwipeLeft = () => { },
  onSwipeRight = () => { },
}) {
  const [cardIdx, setCardIdx] = useState(0);
  const position = new Animated.ValueXY();

  // check that the function exists and then put it to true
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  // the next time it renders this component it needs to animate any changes that are made
  // in this case is when we are moving the deck 10 pixels to the top after dragging out the card
  LayoutAnimation.spring();

  const getCardStyle = () => {
    // replaces the value of x for the output range
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-80deg', '0deg', '80deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  const onSwipeComplete = (direction) => {
    const item = data[cardIdx];
    (direction === 'right') ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCardIdx((prev) => prev + 1);
  };

  const forceSwipe = (direction) => {
    const x = (direction === 'right') ? SCREEN_WIDTH : -SCREEN_WIDTH;

    // timing is more linear
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    // spring is more like bouncing
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start();
  };

  const panResponder = PanResponder.create({
    // it means that this panResponder is responsible when the item is clicked (for dragging)
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      // dx and dy is the difference between the initial position and the current position of the finger
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) forceSwipe('right');
      else if (gesture.dx < -SWIPE_THRESHOLD) forceSwipe('left');
      else resetPosition();
    },
  });

  if (cardIdx >= data.length) return renderNoMoreCards();

  return (
    <View>
      {data.map((item, idx) => {
        // previous cards were already dragged, don't render them
        if (idx < cardIdx) return null;
        // only the first card can be dragged
        if (idx === cardIdx) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle]}
              // panHandlers is an object that has different callbacks that help intercept pressed from the user
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          )
        }

        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: (5 * (idx - cardIdx)) }]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }).reverse()}
    </View>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: '100%',
  }
});
```

## One Time Password

We need two files:<br>

functions/service_account.json
```json
{
  "type": "service_account",
  "project_id": "react-native-course-2797e",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY----------END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-n9j33@react-native-course-2797e.iam.gserviceaccount.com",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n9j33%40react-native-course-2797e.iam.gserviceaccount.com"
}
```

functions/twilio_account.json
```json
{
  "accountSid": "from_twilio",
  "authToken": "from_twilio"
}
```

.env
```
API_KEY=
AUTH_DOMAIN=
DATABASE_URL=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
```

### Section 6: One Time Password Authentication

Explaining the workflow of OTP and the technologies used (Firebase and Twilio).
Create a firebase function to create a user.

### Section 7: Twilio Integration

Sending SMS with Twilio.
Creating JWT for authentication.

### Section 8: Client Side One Time Passwords

Develop the client interface to signup and login.

#### Most complex part (firebase function to create One Time Password):

```javascript
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
```

## Jobs

### Section 9: Bringing it All Together

Learning @react-navigation.<br>
Creating an slide welcome screen.

### Section 10: Facebook Authentication

I've decided to usee Google Authentication since I don't have a facebook account.<br>
First, we need to create a project in google cloud.<br>
Second. create an account of expo.<br>

app.config.js
```javascript
export default {
  "expo": {
    ...
    "slug": "react-native-advanced-concepts",
    "owner": "dajimenezriv",
    "scheme": "myscheme",
    ...
  }
}
```

Login into expo and start the app.
```bash
expo login
npx expo start
```

### Section 11: MapViews on React Native

We need to retrieve the jobs from the indeed API.<br>
However, it's deprecated, so we are going to mock the data.<br>
Create a deck to like or dislike a job.<br>
Then, we have a review screen where we can apply for a job.
