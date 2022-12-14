import 'dotenv/config';

export default {
  "expo": {
    "name": "one_time_password",
    "slug": "one_time_password",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiKey": process.env.API_KEY,
      "authDomain": process.env.AUTH_DOMAIN,
      "databaseURL": process.env.DATABASE_URL,
      "projectId": process.env.PROJECT_ID,
      "storageBucket": process.env.STORAGE_BUCKET,
      "messagingSenderId": process.env.MESSAGING_SENDER_ID,
      "appId": process.env.APP_ID,
    },
  }
}
