// logic
import { useDispatch, useSelector } from 'react-redux';
import { likeJob } from '../reducers/jobs';

// gui
import { View } from 'react-native';
import { Card } from '@rneui/base';

// components
import Swipe from '../components/Swipe';
import JobCard from '../components/JobCard';

export default function DeckScreen() {
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
          </Card>
        )}
        renderCard={(job) => <JobCard job={job} />}
        onSwipeRight={(job) => dispatch(likeJob(job))}
      />
    </View>
  )
}
