import { View, StyleSheet } from 'react-native';
import Ball from '../components/Ball';

export default function BallScreen() {
  return (
    <View style={styles.container}>
      <Ball />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
