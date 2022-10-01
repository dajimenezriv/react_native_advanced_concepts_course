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
