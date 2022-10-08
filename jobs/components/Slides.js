import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button } from '@rneui/base';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Slides({ data, onComplete }) {
  return (
    <ScrollView horizontal pagingEnabled style={styles.container}>
      {[...data].map((slide, idx) => {
        return (
          <View
            key={slide.text}
            style={[
              styles.slide,
              { backgroundColor: slide.color }
            ]}
          >
            <Text style={styles.slideText}>{slide.text}</Text>
            {(idx === data.length - 1) && (
              <Button
                title="Onwards!"
                type="outline"
                raised
                onPress={onComplete}
              />
            )}
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 25
  },
});
