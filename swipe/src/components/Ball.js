import { StyleSheet, View, Animated } from 'react-native';

// usually an app workflow
// - initial state
// - renders components
// - update state
// - rerenders components

// animation works different
// ball + animated.view rendered
// a.view inspects its props, finds animated value
// valueXY starts changing
// a.view sees updated value from animatedXY
// a.view updates its styling

export default function Ball() {
  // what's the current position of the object
  const posititon = new Animated.ValueXY(0, 0);

  // spring is being used to change the current position
  Animated.spring(posititon, {
    toValue: { x: 200, y: 500 },
  }).start();

  return (
    <Animated.View style={posititon.getLayout()}>
      <View style={styles.ball} />
    </Animated.View >
  )
}

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
});
