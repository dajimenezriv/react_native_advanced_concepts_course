// logic
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// gui
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { Button } from '@rneui/base';
import { getJobs } from '../reducers/jobs';

const initialRegion = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09,
}

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const [region, setRegion] = useState(initialRegion);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      />
      <View style={{
        position: 'absolute',
        margin: 5,
        bottom: 0,
        left: 0,
        right: 0
      }}>
        <Button
          title="Search This Area"
          icon={{ name: 'search', color: '#fff' }}
          onPress={() => dispatch(getJobs(region, () => navigation.navigate('Deck')))}
        />
      </View>
    </View>
  )
}
