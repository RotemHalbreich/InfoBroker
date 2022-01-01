import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from './components/CustomDrawer.js';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen.js';
import AnalyzeScreen from './screens/AnalyzeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import StackNavigation from './navigation/StackNavigation.js';
import BottomTab from './navigation/BottomTab.js';
import AdminScreen from './screens/AdminScreen';
import apiReq from './utils/axios';

import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { useDrawerStatus } from '@react-navigation/drawer';


//App Notifications:
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    } token = (await Notifications.getExpoPushTokenAsync()).data;
  }
  else { console.log('Must use physical device for Push Notifications'); }
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = ({ navigation }) => (
  <StackNavigation />
);
import AsyncStorage from '@react-native-async-storage/async-storage';
import useForceUpdate from 'use-force-update';

export default function App() {


  const responseListener = useRef();
  useEffect(() => {
    if (Constants.isDevice && Platform.OS !== 'web') {
      registerForPushNotificationsAsync().then(token => {
        axios.post(`https://app.nativenotify.com/api/expo/key`, {
          appId: 854,
          appToken: 'yDKfK8CzJablGY64gcVtAh',
          expoToken: token
        })
      });
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response.notification.request.content.data);
        // If you send a Data Object with your push notification,
        // your Data Object will return here within 'response.notification.request.content.data' once your user taps on your push notification.
        // You can use a Data Object value to redirect your user to a certain screen based on the value of your Data Object
        // Your Data Object should always return if the app is in the foreground or background when push notification is clicked.
        // Your Data Object may not return if the app is killed when push notification is clicked.
      });
      return () => { Notifications.removeNotificationSubscription(responseListener); };
    }
  });
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect (async ()=>{
    try{
    const token = await AsyncStorage.getItem('token');
    console.log("Aaa");
    if(token){
      const response = await apiReq.post('/auth/isAdmin', { token: token});
      setIsAdmin(response.data.admin)
      console.log(useIsDrawerOpen());
    }
  }catch (e){
    console.log(e);
  }
  },[isAdmin])

  
  
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#014576',

          },
          headerTintColor: '#fff',
          drawerActiveBackgroundColor: '#014576',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 15,
          },
        }}>
        {/* <Drawer.Screen
          screenOptions={{ headerShown: false }}
          name="a"
          component={AuthStack}
          
        /> */}

        <Drawer.Screen
          screenOptions={{ headerShown: false }}
          name="Home"
          component={AuthStack}
          options={
            {unmountOnBlur:true}, 
            {
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Analytics"
          component={AnalyzeScreen}
          options={
            {unmountOnBlur:true}, 
            {
            drawerIcon: ({ color }) => (
              <Ionicons name="analytics-outline" size={22} color={color} />
            ),
          }}
        />
       
          {isAdmin?
          <Drawer.Screen
          name="Admin"
          component={AdminScreen}
          options={
            {unmountOnBlur:true}, 
            {
            
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            ),
          }}
        /> : null
        }
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={
            {unmountOnBlur:true}, 
            {
            drawerIcon: ({ color }) => (
              <Ionicons name="information-circle-outline" size={22} color={color} />
            ),
          }}
        />


      </Drawer.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});