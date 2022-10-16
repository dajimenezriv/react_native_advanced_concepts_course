import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from '@rneui/base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

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
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Map" component={MapScreen} options={{
        tabBarIcon: ({ color }) => (
          <Icon name="explore" size={30} color={color} />
        )
      }} />
      <Tab.Screen name="Deck" component={DeckScreen} options={{
        tabBarIcon: ({ color }) => (
          <Icon name="style" size={30} color={color} />
        )
      }} />
      <Tab.Screen name="ReviewNav" component={ReviewNavigator} options={{
        tabBarIcon: ({ color }) => (
          <Icon name="preview" size={30} color={color} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}>
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Auth" component={AuthScreen} />
            <Tab.Screen name="MainNav" component={MainNavigator} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
