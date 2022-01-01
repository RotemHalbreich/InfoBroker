
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Drawer,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableRipple,
  Share,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utils/UserPermissions.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import apiReq from '../utils/axios'



const CustomDrawer = (props) => {

  const [image, setImage] = useState(null);
  const [u_name, setName] = useState(null);


  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await apiReq.post('/auth/getUserByName', { token: token });
      if (response.status == 200) {
        setName(response.data.name);
      }
    } catch (e) {
      console.log(e);
    }

  }, [])

  const handleAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // const [status, requestPermission] = MediaLibrary.usePermissions();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'This is your shared message!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signOutUser = async () => {
    await AsyncStorage.removeItem('token')
    props.navigation.navigate('Sign In')
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#05375a' }}>
        <ImageBackground
          source={require('../assets/images/sidebar.jpg')}
          style={{ padding: 20 }}>
          <TouchableOpacity onPress={handleAvatar}>

            {
              image ? <Image source={{ uri: image }} style={styles.userImage} /> :
                <>
                  <Image
                    source={require('../assets/images/blank.png')}
                    style={styles.userImage}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                    <MaterialIcons name="add-a-photo" size={22} color={'white'} />
                    <Text
                      style={styles.addAvatarPhoto}>
                      Pick Profile Picture
                    </Text>
                  </View>
                </>
            }
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 style={{ marginEnd: 12 }} name="user-tie" size={20} color="#fff" />
            <Text
              style={styles.username}>
              {u_name}
            </Text>
          </View>

        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={onShare} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={styles.shareButton}>
              Share
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { signOutUser() }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
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
    borderRadius: 100,
    marginBottom: 10,
  },

  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['small-caps'],
    // fontFamily: 'BreeSerif',
  },

  subtitle: {
    color: '#fff',
    fontSize: 15,
    // fontFamily: 'BreeSerif',
    marginRight: 5,
  },

  shareButton: {
    fontSize: 15,
    // fontFamily: 'BreeSerif',
    marginLeft: 5,
  },

  addAvatarPhoto: {
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['small-caps'],
    // fontFamily: 'BreeSerif',
    color: '#fff',
    marginLeft: 10,
  }

})