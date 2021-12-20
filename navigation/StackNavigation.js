
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import resolveAuthScreen from '../screens/resolveAuthScreen.js'
import SplashScreen from '../screens/SplashScreen.js';
import SignInScreen from '../screens/SignInScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import HomeScreen from '../screens/HomeScreen';
const Stack = createNativeStackNavigator();

const StackNavigation = ({ navigation }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="resolve auth" component={resolveAuthScreen} />
    <Stack.Screen name="Splash Screen" component={SplashScreen} />
    <Stack.Screen name="Sign In" component={SignInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />

  </Stack.Navigator>
);

export default StackNavigation;