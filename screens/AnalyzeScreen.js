import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import apiReq from '../utils/axios';
import { SearchBar } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const jsonURL = "https://infobroker.herokuapp.com/api/stock/getCurrStockData?symbol=";

const AnalyzeScreen = () => {

  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);


  useEffect(() => {
    search.toUpperCase
    fetch(jsonURL + search)
      .then((response) => response.json())
      .then((json) => {
        setData(json.stocks);
        console.log(json.stocks);
      })
  }, [update]);


  const displayResults = (item, index) => {
    if (!item) { return null }
    return (
      <View>
        <Text style={styles.text}>Name: {item.longName}</Text>
        <Text style={styles.text}>At Close {item.regularMarketPrice}</Text>
        <Text style={styles.text}>Pre Market Price: {item.preMarketPrice} ({item.preMarketChangePercent}%) </Text>
        <Text style={styles.text}>Day's Range: {item.regularMarketDayRange}</Text>
        <Text style={styles.text}>Volume: {item.regularMarketVolume}</Text>
        <Text style={styles.text}>Open: {item.regularMarketOpen}</Text>
        <Text style={styles.text}>Previous Close: {item.regularMarketPreviousClose}</Text>
        <Text style={styles.text}>50 Day Average: {item.fiftyDayAverage}</Text>
        <Text style={styles.text}>52 Week Range: {item.fiftyTwoWeekRange}</Text>
        <Text style={styles.text}>Recommendation Rating: {item.averageAnalystRating}</Text>
        <Text style={styles.text}>Market State: {item.marketState}</Text>
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.container}>

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
    marginTop: 30,
    marginLeft: 35,
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 20,
    fontVariant: ['small-caps']
  },
  text: {
    paddingVertical: 9,
    color: '#05375a',
    fontSize: 15,
    fontWeight: 'bold',
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
});