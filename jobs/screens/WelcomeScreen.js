// logic
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

// gui
import { View } from 'react-native';

// components
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this app to get a job anywhere', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' },
];

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen({ navigation }) {
  const [ready, setReady] = useState(false);

  const { token } = useSelector((state) => state.auth); 

  useEffect(() => {
    setReady(true);
    if (token) navigation.navigate('MainNav');
  }, [token]);

  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  const onSlidesComplete = () => { navigation.navigate('Auth'); };

  if (!ready) return null;

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
      <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />
    </View>
  )
}
