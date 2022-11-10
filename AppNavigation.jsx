import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as ScreenOrientation from 'expo-screen-orientation';
import { OrientationLock } from 'expo-screen-orientation';

import Home from './screens/Home';

function Navigation() {
  const stack = createStackNavigator();
  /*
      The whole <NavigationContainer> thing and everything inside it is how the app is handling multi-screens.
      Documentation available at https://reactnavigation.org.
    */

  ScreenOrientation.lockAsync(OrientationLock.PORTRAIT).catch(() => {
    console.log('Orientation lock failed.');
  }); // Not waiting on promise resolution because by the time the rest of the app renders, it should already be resolved.

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <stack.Screen name="Home" component={Home} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
