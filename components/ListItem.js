import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/Dimensions';

export default function ListItem({ photo, title, subTitle, isFree, price }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Image
          source={photo}
          style={{ width: 55, height: 55, borderRadius: 10, marginRight: 8 }}
        />
        <View style={{ width: windowWidth - 220 }}>
          <Text
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}>
            {subTitle}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={{
        backgroundColor: '#496cfa',
        padding: 10,
        width: 100,
        borderRadius: 10,
      }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
        }}>
          {isFree == 'Yes' && 'Get info'}
          {isFree == 'No' && price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}