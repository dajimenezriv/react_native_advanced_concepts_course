import { View } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useState } from 'react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-react-native-course-2797e.cloudfunctions.net';

export default function SignInForm() {
  const [phone, setPhone] = useState('34639075911');
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${ROOT_URL}/verifyOTP`, { phone, code });
      const { token } = data;
      const user = await signInWithCustomToken(auth, token)
      console.log('Logged user', user);
    } catch (err) {
      if (err.response) console.log(err.response.data);
      else console.log(err);
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
      <Input
        style={{ marginBottom: 10 }}
        placeholder="Enter code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <Button
        onPress={handleSubmit}
        title="Sign In"
      />
    </View>
  );
}
