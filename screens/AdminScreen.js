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
import { useTheme } from 'react-native-paper';


const AdminScreen = () => {
  const { colors } = useTheme();
  

  const [userCounter, setUsersCounter] = useState(0);
  const [addAdminMail, setAddAdminMail] = useState("")
  const [remMail, setRemMail] = useState("")
  const [addSymbol, setAddSymbol] = useState("")
  const [remSymbol, setremSymbol] = useState("")
  const [isError , setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isSuccess , setIsSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(async () => {
    const response = await apiReq.get('/auth/usersCounter');
    if(response.status == 200){
      setUsersCounter(response.data.user_counter);
    }
  }, []);

  const setUserAdmin = async () =>{
    try{
    await apiReq.post('/auth/setAdmin', {email : addAdminMail});
    setSuccessMsg("successfuly updated permission of the given user")
    setIsSuccess(true)

    }catch{
      setErrorMsg("The given user does not exist")
      setIsError(true)

    }finally{
      setRemMail("")
      setAddSymbol("")
      setremSymbol("")
      setAddAdminMail("")
    }
  }

  const removeUser = async () =>{
    try{
      await apiReq.post('/auth/removeUser', {email : remMail});
      setSuccessMsg("successfuly removed the given user")
      setIsSuccess(true)
  }catch{
      setErrorMsg("The given user does not exist")
      setIsError(true)
  }finally{
    setRemMail("")
    setAddSymbol("")
    setremSymbol("")
    setAddAdminMail("")
  }
  
  }


  const addRecSymbol = async () =>{
    try{
    const response = await apiReq.post('/stock/appendRecStock', {stock_name : addSymbol});  
    setSuccessMsg("successfuly appended the given symbol")
    setIsSuccess(true)
    }catch{
      setErrorMsg("server Error")
      setIsError(true)
    }finally{
      setRemMail("")
      setAddSymbol("")
      setremSymbol("")
      setAddAdminMail("")
    }


  
  }

  const remRecSymbol = async () =>{
    
    const response = await apiReq.post('/stock/removeRecStock', {stock_name : remSymbol});
    if(response.status == 200){
      setSuccessMsg("successfuly removed the given symbol")
      setIsSuccess(true)
    }else{
      setErrorMsg("server Error")
      setIsError(true)
    }
    setRemMail("")
    setAddSymbol("")
    setremSymbol("")
    setAddAdminMail("")
  
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Admin Page</Text>
        </View>
        <StatusBar backgroundColor='#014576' barStyle="light-content" />

        <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}
        >
        <Text style={styles.text}>number of Users: {userCounter}</Text>


        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>
          set user Admin
        </Text>
        <View style={styles.action}>
          <Feather
            name="user"
            color='#05375a'
            size={20}

          />
          <TextInput
            placeholder="user's E-mail"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            value={addAdminMail}
            onChangeText={(e) => { setIsError(false) ; setIsSuccess(false) ; setAddAdminMail(e) }}
            onSubmitEditing={() => setUserAdmin()}
          />

        </View>

        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>
          remove user
        </Text>
        <View style={styles.action}>
          <Feather
            name="user-x"
            color='#05375a'
            size={20}
          />
          <TextInput
            placeholder="user's E-mail"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            value={remMail}

            autoCapitalize="none"
            onChangeText={(m) => {  setIsError(false) ; setIsSuccess(false) ; setRemMail(m) }}
            onSubmitEditing = {()=> {removeUser()}}
          />

        </View>

        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>
          Add Recommended Symbol
        </Text>
        <View style={styles.action}>
          <Feather
            name="plus"
            color='#05375a'
            size={20}
          />
          <TextInput
            placeholder="insert symbol name"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            value={addSymbol}

            autoCapitalize="none"
            onChangeText={(m) => { setIsError(false) ; setIsSuccess(false) ; setAddSymbol(m) }}
            onSubmitEditing = {()=> {addRecSymbol()}}
          />

        </View>

        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>
          Remove Recommended Symbol
        </Text>
        <View style={styles.action}>
          <Feather
            name="minus"
            color='#05375a'
            size={20}
          />
          <TextInput
            placeholder="insert symbol name"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            value={remSymbol}

            autoCapitalize="none"
            onChangeText={(m) => { setIsError(false) ; setIsSuccess(false) ; setremSymbol(m) }}
            onSubmitEditing={()=>  remRecSymbol()}
          />

</View>
        {isError ? <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </Animatable.View> : null
        }

        {isSuccess ? <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.successMsg}>{successMsg}</Text>
        </Animatable.View> : null
        }
        



        </Animatable.View>
      </View>

    </SafeAreaView >
  )
}

export default AdminScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#014576',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  successMsg: {
    color: '#538138',
    fontSize: 14,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text: {
    paddingVertical: 6,
    color: '#05375a',
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginLeft: 30,
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 10,
    fontVariant: ['small-caps']
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  }
})
