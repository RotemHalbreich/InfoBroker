
import React from 'react';
import {
  StyleSheet,
  Drawer,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableRipple,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { auth } from '../firebase.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#496cfa' }}>
        <ImageBackground
          source={require('../assets/images/sidebar.jpg')}
          style={{ padding: 20 }}>
          <Image
            source={require('../assets/images/user.png')}
            style={styles.userImage}
          />
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome5 style={{ marginEnd: 12 }} name="user-tie" size={20} color="#fff" />
            <Text
              style={styles.username}>
              {auth.currentUser?.email}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome5 style={{ marginEnd: 10 }} name="hand-holding-usd" size={18} color="#fff" />
            <Text
              style={styles.subtitle}>
              Welcome to InfoBroker
            </Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={styles.shareButton}>
              Share
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c9f',
  },

  imageContainer: {
    width: '60%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },

  userImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },

  subtitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    marginRight: 5,
  },

  shareButton: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  }

})