import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { auth } from '../firebase.js'
import { signOut } from 'firebase/auth'
import { windowWidth } from '../utils/Dimensions';

import { insights, news, sliderData } from '../model/data.js'
import BannerSlider from '../components/BannerSlider';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { FontAwesome } from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const HomeScreen = () => {

  const navigation = useNavigation();
  const [symbolsTab, setSymbolsTab] = useState(1);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setSymbolsTab(value);
  };

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       navigation.replace("Login")
  //     })
  //     .catch(error => alert(error.message))
  // }

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{ padding: 25, flexGrow: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.user}>
          Welcome  Rotem!
        </Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {/* <ImageBackground
            source={require('../assets/images/user.jpg')}
            style={{ width: 35, height: 35, marginTop: 20 }}
            imageStyle={{ borderRadius: 25 }}
          /> */}
          <MaterialIcons
            name="menu"
            style={{ width: 35, height: 35, marginTop: 20 }}
            size={40}
            color={'#014576'}
          />
        </TouchableOpacity>
      </View>


      <View
        style={styles.recommends}>
        <Ionicons
          name="bookmarks"
          color="#05375a"
          size={25} />
        <Text style={styles.header}>
          Recommended Symbols
        </Text>
        {/* <TouchableOpacity onPress={() => { }}>
          <Text style={{ color: '#1f78ed' }}>See all</Text>
        </TouchableOpacity> */}
      </View>

      <Carousel
        // ref={c => {
        //   this._carousel = c;
        // }}
        data={sliderData}
        renderItem={renderBanner}
        sliderWidth={windowWidth - 50}
        itemWidth={300}
        loop={true}
      />

      <View style={{ marginVertical: 20 }}>
        <CustomSwitch
          selectionMode={1}
          option1="Insights"
          option2="News"
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      {symbolsTab == 1 &&
        insights.map(item => (
          <ListItem
            key={item.id}
            photo={item.poster}
            title={item.title}
            subTitle={item.subtitle}
            getInfo={item.getInfo}
          />
        ))}
      {symbolsTab == 2 &&
        news.map(item => (
          <ListItem
            key={item.id}
            photo={item.poster}
            title={item.title}
            subTitle={item.subtitle}
            Article={item.Article}
          />
        ))}
    </ScrollView>
    // </SafeAreaView >
  );
}


export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
    color: '#014576',
    marginLeft: 15
  },

  user: {
    fontSize: 25,
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
    marginTop: 27,
    marginLeft: 10,
    color: '#1e83cb',
  },

  recommends: {
    marginVertical: 10,
    flexDirection: 'row',
    marginLeft: 5
  },
})
