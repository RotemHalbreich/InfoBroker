import React, { useState } from 'react';
import apiReq from '../utils/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';


const SignUpScreen = ({ navigation }) => {

  const [fisrtName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmedPassword, setConfirmedPassword] = useState('')
  const [isError , setError] = useState(false)
  const [errorMsg , setErrorMsg] = useState('')

  const emailValidation = () =>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(Email)
  }

  const signupHandle =async () => {
    if(!fisrtName || !lastName || !Email || !password || !ConfirmedPassword){
      setErrorMsg("Please fill all the fields, try again.")
      setError(true)
      return
    }
    if(password != ConfirmedPassword){
      setErrorMsg("Passwords does not match, try again.")
      setError(true)
      return
    }
    if (!emailValidation()){
      setErrorMsg("The given E-mail is not valid!, try again.")
      setError(true)
      return
    }

    try{
      const response = await apiReq.post('/auth/register', 
      {"first_name" : fisrtName, "last_name" : lastName,"email": Email, "password": password, "admin": "false"})
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Home')
    }catch(err){
      setErrorMsg("User already exists, Please log in")
      setError(true)
      return
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#014576' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Registration</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >

        
        <ScrollView>
        <Text style={styles.text_footer}>First Name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-circle"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your First Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {setError(false); setfirstName(val)}}
            />
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Last Name</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-circle"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Last Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {setError(false); setlastName(val)}}
            />
          </View>
          

          
          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>E-Mail</Text>
          <View style={styles.action}>
            <Feather
              name="mail"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your E-Mail"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {setEmail(val); setError(false)}}
            />
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setPassword(val)}
              secureTextEntry =  {true}
            />

          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Confirm Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#014576"
              size={20}
            />
            <TextInput
              placeholder="Confirm Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {setError(false), setConfirmedPassword(val)}}
              secureTextEntry =  {true}

            />
          
          </View>
          
        {isError? <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </Animatable.View> : null
        }



          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {{signupHandle()} }}
            >
              <LinearGradient
                colors={['#69a7d0', '#092f80']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
                
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.signIn, {
                borderColor: '#014576',
                borderWidth: 1,
                marginTop: 15
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#014576'
              }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014576'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40
  },
  text_footer: {
    color: '#014576',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#014576',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  }

});