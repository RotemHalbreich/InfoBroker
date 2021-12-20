import React, {useEffect}from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const resolveAuthScreen =({ navigation })=>{
    useEffect(()=>{tryLocalSignIn()},[])

    const tryLocalSignIn = async ()=>{
      const token = await AsyncStorage.getItem('token');
      if(token){
        navigation.navigate('Home')
      }else{navigation.navigate('Splash Screen')}
    };

  
    return null;
};

export default resolveAuthScreen;