// logic
import { useDispatch, useSelector } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { googleLogin } from '../reducers/auth';

// gui
import { Button, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen({ navigation }) {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) navigation.navigate('MainNav');
  }, [token]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '740846720538-ndmidc19k0hqksco445i05gcmiu65tb6.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        disabled={!request}
        title="Log in Google"
        onPress={() => dispatch(googleLogin(promptAsync))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  button: {
    flex: 1,
  }
});
