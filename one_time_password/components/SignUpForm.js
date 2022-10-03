import { View } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useState } from 'react';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-react-native-course-2797e.cloudfunctions.net';

export default function SignUpForm() {
  const [phone, setPhone] = useState('34639075911');

  const handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone });
      await axios.post(`${ROOT_URL}/requestOTP`, { phone });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Input
        style={{ marginBottom: 10 }}
        placeholder="Enter phone number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <Button
        onPress={handleSubmit}
        title="Sign Up"
      />
    </View>
  );
}
