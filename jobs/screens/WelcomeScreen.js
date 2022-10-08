import { StyleSheet } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this app to get a job anywhere', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' },
];

export default function WelcomeScreen({ navigation }) {
  const onSlidesComplete = () => {
    navigation.navigate('Auth');
  };

  return (
    <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30
  }
});
