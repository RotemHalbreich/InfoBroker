
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen.js';
import SignInScreen from '../screens/SignInScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';

const Stack = createNativeStackNavigator();

const StackNavigation = ({ navigation }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash Screen" component={SplashScreen} />
    <Stack.Screen name="Sign In" component={SignInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
);

export default StackNavigation;