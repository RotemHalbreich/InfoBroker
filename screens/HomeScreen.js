import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

import { auth } from '../firebase.js'
import { signOut } from 'firebase/auth'
import { windowWidth } from '../utils/Dimensions';

import { insights, news, sliderData } from '../model/data.js'
import BannerSlider from '../components/BannerSlider';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';

const HomeScreen = () => {

  const navigation = useNavigation();
  const [symbolsTab, setSymbolsTab] = useState(1);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setSymbolsTab(value);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{ padding: 25, flexGrow: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Text style={{ fontSize: 16, /*fontFamily: 'Roboto-Medium'*/ }}>
          Welcome,  {auth.currentUser?.email}!
        </Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <ImageBackground
            source={require('../assets/images/user.jpg')}
            style={{ width: 35, height: 35 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="#C6C6C6"
          style={{ marginRight: 5 }}
        />
        <TextInput placeholder="Search Symbol" />
      </View>

      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 16, /*fontFamily: 'Roboto-Medium'*/ }}>
          Recommended Symbols
        </Text>
        <TouchableOpacity onPress={() => { }}>
          <Text style={{ color: '#1f78ed' }}>See all</Text>
        </TouchableOpacity>
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

  searchBar: {
    flexDirection: 'row',
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
})
