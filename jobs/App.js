import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import { Button } from '@rneui/base';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ReviewNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Review" component={ReviewScreen} options={({ navigation }) => ({
        headerRight: () => (
          <Button
            title="Settings"
            onPress={() => { navigation.navigate('Settings') }}
            type="clear"
          />
        )
      })} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Deck" component={DeckScreen} />
      <Tab.Screen name="ReviewNav" component={ReviewNavigator} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Welcome" component={WelcomeScreen} />
        <Tab.Screen name="Auth" component={AuthScreen} />
        <Tab.Screen name="MainNav" component={MainNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
