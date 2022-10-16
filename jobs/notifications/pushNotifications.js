// logic
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default async () => {
  try {
    let res = await Notifications.getPermissionsAsync();
    if (res.status !== 'granted') res = await Notifications.requestPermissionsAsync();
    if (res.status !== 'granted') return;
    
    res = await Notifications.getExpoPushTokenAsync();
    const token = res.data;
    return token;
  } catch (err) { console.log(err); }
};
