import React, { useState, useContext, createContext , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import apiReq from '../utils/axios'


import { useTheme } from 'react-native-paper';

import Users from '../model/users';

const AuthContext = createContext('');


const SignInScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [iserror, setError] = useState(false)
  const [errorMsg, setErrMsg] = useState('')

  const { colors } = useTheme();

  const { signIn } = useContext(AuthContext);

  const emailValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email)
  }



  const loginHandle = async () => {
    if (!email || !password) {
      setPassword('')
      setEmail('')
      setErrMsg("Error, Please fill the fields again")
      setError(true)
      return;
    }
    if (!emailValidation()) {
      setEmail('')
      setErrMsg("The given E-mail is invalid, please try again.")
      setError(true)
      return
    }

    try {
      const response = await apiReq.post('/auth/login', { "email": email, "password": password })
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate("Home")
      } else {
        setErrMsg("Somthing went wrong, please try again")
        setError(true)
      };

    } catch (err) {
      console.log(err);
      setPassword('')
      setEmail('')
      setErrMsg("E-mail or Password is not correct, please try again.")
      setError(true)
      return;

    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#014576' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Login</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <Text style={styles.text_footer}>
          E-Mail
        </Text>
        <View style={styles.action}>
          <Feather
            name="mail"
            color='#05375a'
            size={20}

          />
          <TextInput
            placeholder="Your E-Mail"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            value={email}
            onChangeText={(e) => { setError(false); setEmail(e) }}
          />

        </View>

        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color='#05375a'
            size={20}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            style={[styles.textInput, {
              color: colors.text
            }]}
            value={password}

            autoCapitalize="none"
            onChangeText={(p) => { setError(false); setPassword(p) }}
          />

        </View>

        {iserror ? <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </Animatable.View> : null
        }


        <TouchableOpacity>
          <Text style={{ color: '#014576', marginTop: 15 }}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => { loginHandle() }}
          >
            <LinearGradient
              colors={['#69a7d0', '#092f80']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color: '#fff'
              }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Sign Up')}
            style={[styles.signIn, {
              borderColor: '#014576',
              borderWidth: 1,
              marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
              color: '#014576'
            }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

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
    flex: 3,
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
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  }
});