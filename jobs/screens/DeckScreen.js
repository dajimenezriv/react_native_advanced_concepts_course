// logic
import { useSelector } from 'react-redux';

// gui
import { View, Text, Platform } from 'react-native';
import { Card, Button } from '@rneui/base';
import MapView from 'react-native-maps';

// components
import Swipe from '../components/Swipe';

export default function DeckScreen() {
  const { jobs } = useSelector((state) => state.jobs);

  return (
    <View style={{
      flex: 1,
    }}>
      <Swipe
        data={jobs}
        renderNoMoreCards={() => (
          <Card>
            <Card.Title>No more jobs</Card.Title>
          </Card>
        )}
        renderCard={(job) => {
          const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02,
          };

          return (
            <Card>
              <Card.Title>{job.jobtitle}</Card.Title>
              <View style={{ height: 300 }}>
                <MapView
                  style={{ flex: 1 }}
                  scrollEnabled={false}
                  // render it as an image
                  cacheEnabled={Platform.OS === 'android'}
                  initialRegion={initialRegion}
                >

                </MapView>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>
                <Text>{job.company}</Text>
                <Text>{job.formattedRelativeTime}</Text>
              </View>
              <Text>{job.snippet}</Text>
            </Card>
          )
        }}
      />
    </View>
  )
}
