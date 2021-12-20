
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from './components/CustomDrawer.js';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen.js';
import AnalyzeScreen from './screens/AnalyzeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import StackNavigation from './navigation/StackNavigation.js';
import BottomTab from './navigation/BottomTab.js';


// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = ({ navigation }) => (
  <StackNavigation />
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
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
            // fontFamily: 'Bree Serif',
            fontSize: 15,
          },
        }}>
        {/* <Drawer.Screen
          name="Sign In" component={AuthStack}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Ionicons name="log-in-outline" size={22} color={color}
              />
            ),
          }}
        /> */}

        <Drawer.Screen
          screenOptions={{ headerShown: false }}
          name="Home"
          component={AuthStack}
          options={{
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
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="analytics-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="bookmarks-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{
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