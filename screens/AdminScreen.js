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

const AdminScreen = () => {

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
        <Text style={styles.title}>Admin Permission</Text>
      </View>
      <StatusBar backgroundColor='#014576' barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
         <View><Text style={styles.contact}>How can we help?</Text></View>
        <TouchableOpacity onPress={navigateGithub}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <FontAwesome5
              name="github"
              size={70}
              color="#630da0"
            />
            <Text
              style={styles.githubButton}>
              Github Page
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

export default AdminScreen;

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
    marginLeft: 30,
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 10,
    fontVariant: ['small-caps']
  },
  githubButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#630da0',
  },
  linkedinButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#1e83cb',
  },
  mailButton: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#b11',
  },
  credits: {
    fontSize: 26,
    color: '#b3aeae',
    fontWeight: '700',
    paddingVertical: 10,
    fontVariant: ['small-caps'],
    marginTop: 50,
    marginLeft: 100
  },
  authors: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b3aeae',
  },
  contact: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    paddingVertical: 10,
    fontVariant: ['small-caps'],
    marginLeft: 28
  }

})
