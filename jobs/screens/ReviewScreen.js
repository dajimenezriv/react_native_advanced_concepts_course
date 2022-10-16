// logic
import { useSelector } from 'react-redux';

// gui
import { ScrollView, Text, View, Linking, Platform } from 'react-native';
import { Card, Button } from '@rneui/base';
import MapView from 'react-native-maps';

export default function ReviewScreen() {
  const { liked } = useSelector((state) => state.jobs);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 15,
      }}
    >
      {[...liked].map((job) => {
        const initialRegion = {
          longitude: job.longitude,
          latitude: job.latitude,
          longitudeDelta: 0.045,
          latitudeDelta: 0.02,
        };

        return (
          <Card key={job.jobkey}>
            <View style={{ height: 200 }}>
              <MapView
                style={{ flex: 1 }}
                cacheEnabled={Platform.OS === 'android'}
                scrollEnabled={false}
                initialRegion={initialRegion}
              />
              <View style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
                <Text style={{ fontStyle: 'italic' }}>{job.company}</Text>
                <Text style={{ fontStyle: 'italic' }}>{job.formattedRelativeTime}</Text>
              </View>
              <Button
                title="Apply"
                type="outline"
                onPress={() => Linking.openURL('https://www.google.es')}
              />
            </View>
          </Card>
        );
      })}
    </ScrollView>
  )
}
