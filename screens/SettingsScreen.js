import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, FlatList, ActivityIndicator, StatusBar, Share } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import apiReq from '../utils/axios';
import { SearchBar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core'

const SettingsScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons
          name="menu"
          style={{ width: 35, height: 35, marginTop: 20, marginStart: 300 }}
          size={40}
          color={'#fff'}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>Settings</Text>
      </View>
      <StatusBar backgroundColor='#014576' barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
      </Animatable.View>
    </View>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#014576',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    marginLeft: 95,
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 10,
    fontVariant: ['small-caps']
  },

})
