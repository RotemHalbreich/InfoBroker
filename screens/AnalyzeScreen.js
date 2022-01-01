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
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const jsonURL = "https://infobroker.herokuapp.com/api/stock/getCurrStockData?symbol=";

const AnalyzeScreen = () => {

  const [lastSymbol, setLastSymbol] = useState("TSLA")
  const [data, setData] = useState(undefined);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();
  console.log("aaaaa");
  useEffect(async ()=> {
    const symbol = await AsyncStorage.getItem('symbol');
    if(symbol){
      setLastSymbol("AAPL")
      setSearch(symbol)
      setUpdate((update) => !update)
    }
  }, [])

  useEffect(() => {

    search.toUpperCase
    fetch(jsonURL + search)
      .then((response) => response.json())
      .then((json) => {
        setData(json.stocks);
      })
  }, [update]);


  const displayResults = (item, index) => {
    if (!item) { return null }
    return (
      <View>
        <Text style={styles.text}>Name:  {item.longName}</Text>
        <Text style={styles.text}>At Close  {item.regularMarketPrice}</Text>
        <Text style={styles.text}>Pre Market Price:  {item.preMarketPrice} ({item.preMarketChangePercent}%) </Text>
        <Text style={styles.text}>Day's Range:  {item.regularMarketDayRange}</Text>
        <Text style={styles.text}>Year's Range:  {item.fiftyTwoWeekRange}</Text>
        <Text style={styles.text}>Volume:  {item.regularMarketVolume}</Text>
        <Text style={styles.text}>Open:  {item.regularMarketOpen}</Text>
        <Text style={styles.text}>Previous Close:  {item.regularMarketPreviousClose}</Text>
        <Text style={styles.text}>50 Day Average:  {item.fiftyDayAverage}</Text>
        <Text style={styles.text}>Analysts Rating:  {item.averageAnalystRating}</Text>
        <Text style={styles.text}>Market State:  {item.marketState}</Text>
      </View>
    );
  }


  const onShare = async () => {
    let json = JSON.stringify(data[0]);
    json = json.replaceAll(',', '\n')
    json = json.replaceAll('"', '')
    json = json.replaceAll('{', '')
    json = json.replaceAll('}', '')
    json = json.replaceAll(':', ':   ')
    console.log(json);
    try {
      const result = await Share.share({
        message: json
      })
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons
          name="menu"
          style={{ width: 35, height: 35, marginTop: 20, marginStart: 300 }}
          size={40}
          color={'#fff'}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Stock Analysis</Text>
        </View>
        <StatusBar backgroundColor='#014576' barStyle="light-content" />

        <View style={styles.view}>
          <SearchBar
            inputStyle={{ backgroundColor: '#fff', fontSize: 16 }}
            containerStyle={styles.searchBar}
            inputContainerStyle={{ backgroundColor: '#fff' }}
            placeholder={'Search Symbol'}
            onChangeText={(val) => { setSearch(val); }}
            value={search}
            platform={Platform.OS}
            round
            placeholderTextColor={'#C6C6C6'}
            onSubmitEditing={() => setUpdate((update) => !update)}
          ></SearchBar>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}
        >
          <FlatList
            data={data}
            keyExtractor={(item, index) => { return item.symbol }}
            renderItem={({ item, index }) => displayResults(item, index)}
          />
          {
            data &&
            <TouchableOpacity onPress={onShare}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name="share-outline"
                  size={40}
                  color={'#1e83cb'}
                />
                <Text
                  style={styles.shareStock}>
                  Share Stock Information
                </Text>
              </View>
            </TouchableOpacity>
          }
        </Animatable.View>
      </View>

    </SafeAreaView >
  )
}

export default AnalyzeScreen;


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
    marginLeft: 35,
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 10,
    fontVariant: ['small-caps']
  },
  text: {
    paddingVertical: 6,
    color: '#05375a',
    fontSize: 15.6,
    // fontFamily: 'BreeSerif',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  searchBar: {
    marginLeft: 35,
    width: '80%',
    marginBottom: 30,
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  shareStock: {
    fontSize: 16,
    // fontFamily: 'BreeSerif',
    color: '#ffffff',
    marginLeft: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#1e83cb',
    fontWeight: '700',
  },
});