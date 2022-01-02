// import React from 'react';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from '../screens/HomeScreen.js';
// import AnalyzeScreen from './../screens/AnalyzeScreen';
// import SettingsScreen from './../screens/SettingsScreen';
// import FavoritesScreen from './../screens/FavoritesScreen';

// const HomeStack = createNativeStackNavigator();
// const AnalyzeStack = createNativeStackNavigator();
// const SettingsStack = createNativeStackNavigator();
// const FavoritesStack = createNativeStackNavigator();

// const Tab = createMaterialBottomTabNavigator();

// const BottomTab = () => (
//   <Tab.Navigator
//     initialRouteName="Home"
//     activeColor="#fff"
//   >
//     <Tab.Screen
//       name="Home"
//       component={HomeStackScreen}
//       options={{
//         tabBarLabel: 'Home',
//         tabBarColor: '#009387',
//         tabBarIcon: ({ color }) => (
//           <Icon name="ios-home" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Analyze"
//       component={AnalyzeStackScreen}
//       options={{
//         tabBarLabel: 'Analyze',
//         tabBarColor: '#1f65ff',
//         tabBarIcon: ({ color }) => (
//           <Icon name="ios-notifications" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Favorites"
//       component={FavoritesStackScreen}
//       options={{
//         tabBarLabel: 'Favorites',
//         tabBarColor: '#694fad',
//         tabBarIcon: ({ color }) => (
//           <Icon name="ios-person" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Settings"
//       component={SettingsStackScreen}
//       options={{
//         tabBarLabel: 'Settings',
//         tabBarColor: '#d02860',
//         tabBarIcon: ({ color }) => (
//           <Icon name="ios-aperture" color={color} size={26} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );

// const HomeStackScreen = ({ navigation }) => (
//   <HomeStack.Navigator screenOptions={{
//     headerShown: false,
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <HomeStack.Screen name="Home" component={HomeScreen} options={{
//       headerShown: false,
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </HomeStack.Navigator>
// );

// const AnalyzeStackScreen = ({ navigation }) => (
//   <AnalyzeStack.Navigator screenOptions={{
//     headerShown: false,
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <AnalyzeStack.Screen name="Details" component={AnalyzeScreen} options={{
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </AnalyzeStack.Navigator>
// );

// const FavoritesStackScreen = ({ navigation }) => (
//   <FavoritesStack.Navigator screenOptions={{
//     headerShown: false,
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#694fad" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </FavoritesStack.Navigator>
// );

// const SettingsStackScreen = ({ navigation }) => (
//   <SettingsStack.Navigator screenOptions={{
//     headerShown: false,
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{
//       headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
//       )
//     }} />
//   </SettingsStack.Navigator>
// );

// export default BottomTab;