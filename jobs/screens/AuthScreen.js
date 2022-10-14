import { View, Text, StyleSheet, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '740846720538-ndmidc19k0hqksco445i05gcmiu65tb6.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  const login = async () => {
    const res = await promptAsync();
    if (res.type === 'success') {
      const token = res.authentication.accessToken;
      console.log(token);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>AuthScreen</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={login}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30
  }
});
