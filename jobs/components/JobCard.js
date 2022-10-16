// gui
import MapView from 'react-native-maps';
import { View, Text, Platform } from 'react-native';
import { Card } from '@rneui/base';

export default function JobCard({ job }) {
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
}