import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen" component={WelcomeScreen} />
        <Tab.Screen name="Auth" component={AuthScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
