import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth } from '../utils/Dimensions';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListItem({ image, symbol, name, getInfo, Article }) {
  const navigation = useNavigation();
  
  const setGetInfo = async (s) =>{
    console.log(s);
    await AsyncStorage.setItem('symbol', s);

    navigation.navigate('Analytics', s)
  
  }

  return (
    <View style={styles.container}>
      <View style={styles.middleScreen}>
        <Image
          source={{uri: image}}
          style={styles.photo}
        />
        <View style={{ width: windowWidth - 220 }}>
          <Text
            style={{
              color: '#333',
              // fontFamily: 'BreeSerif',
              fontSize: 13.5,
            }}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#333',
              // fontFamily: 'BreeSerif',
              fontSize: 14,
              textTransform: 'uppercase',
              fontWeight: '700'
            }}>
            {symbol}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setGetInfo(symbol)} 
      style={{
        backgroundColor: '#014576',
        padding: 10,
        width: 100,
        borderRadius: 10,
      }

      }>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          // fontFamily: 'BreeSerif',
          fontSize: 14,
        }}>
         
          {/* {getInfo == 'Yes' && 'Get info'}
          {Article == 'Yes' && 'Article'} */}
          Get Info
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 55, 
    height: 55, 
    borderRadius: 10, 
    marginRight: 8
  },
  middleScreen: {
    flexDirection: 'row',
    alignItems: 'center', 
    flex: 1
  },


});