// logic
import { useDispatch } from 'react-redux';
import { clearLikedJobs } from '../reducers/jobs';

// gui
import { Button } from '@rneui/base';
import { View } from 'react-native';

export default function SettingsScreen() {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
      <Button
          title="Reset Liked Jobs"
          type="solid"
          icon={{ name: 'delete-forever', color: '#fff' }}
          onPress={() => dispatch(clearLikedJobs())}
        />
      </View>
    </View>
  )
}
