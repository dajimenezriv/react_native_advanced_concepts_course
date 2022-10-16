// logic
import { useDispatch, useSelector } from 'react-redux';
import { likeJob } from '../reducers/jobs';

// gui
import { View } from 'react-native';
import { Button, Card } from '@rneui/base';

// components
import Swipe from '../components/Swipe';
import JobCard from '../components/JobCard';

export default function DeckScreen({ navigation }) {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  return (
    <View style={{
      flex: 1,
      marginTop: 50,
    }}>
      <Swipe
        data={[...jobs]}
        keyProp="jobkey"
        renderNoMoreCards={() => (
          <Card>
            <Card.Title>No more jobs</Card.Title>

            <Button
              buttonStyle={{ marginBottom: 10 }}
              title="Back to Map"
              type="solid"
              icon={{ name: 'my-location', color: '#fff' }}
              onPress={() => navigation.navigate('Map')}
            />

            <Button
              title="Check Liked Jobs"
              type="outline"
              icon={{ name: 'recommend', color: '#000' }}
              onPress={() => navigation.navigate('ReviewNav')}
            />
          </Card>
        )}
        renderCard={(job) => <JobCard job={job} />}
        onSwipeRight={(job) => dispatch(likeJob(job))}
      />
    </View>
  )
}
