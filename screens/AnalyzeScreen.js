import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import apiReq from '../utils/axios';
import { SearchBar } from 'react-native-elements';
import {List, ListItem} from 'react-native-elements';
const jsonURL = "https://infobroker.herokuapp.com/api/stock/getCurrStockData?symbol=";






const AnalyzeScreen = () => {

  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false)
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
   if(!item){return null} 
    return (
               <View>
                  <Text>Symbol: {item.symbol}</Text>
                  <Text>Name: {item.longName}</Text>
                  <Text>Day's High: {item.regularMarketDayHigh}</Text>
                  <Text>Day's Low: {item.regularMarketDayLow}</Text>
                  <Text>Day's Range: {item.regularMarketDayRange}</Text>
                  <Text>Volume: {item.regularMarketVolume}</Text>
                  <Text>Open: {item.regularMarketOpen}</Text>
                  <Text>Previous Close: {item.regularMarketPreviousClose}</Text>
                  <Text>50 Day Average: {item.fiftyDayAverage}</Text>
                  <Text>52 Week Range: {item.fiftyTwoWeekRange}</Text>
                  <Text>Recommendation Rating: {item.averageAnalystRating}</Text>
                  <Text>Market State: {item.marketState}</Text>
                </View> 
    );}
    

  

 




  return (
    <SafeAreaView style={styles.container}>
      {
        <View>
          <Text style={styles.title}>Stock Analysis</Text>



          <View style={styles.view}>
            <SearchBar
              placeholder="Search Symbol"
              onChangeText={(val) => { setSearch(val);  }}
              value={search}
              containerStyle= {styles.searchBar}
              autoCorrect={false}
              lightTheme
              round
              onSubmitEditing = {()=>setUpdate((update)=>!update)}


            ></SearchBar>
          </View>

          <FlatList
            data={data}
            // keyExtractor={(item, index) => { return item.symbol }}
            renderItem={({ item, index }) => displayResults( item, index )}
          />
   

        </View>
      }
    </SafeAreaView >
  )
}

export default AnalyzeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // footer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   paddingVertical: 50,
  //   paddingHorizontal: 30
  // },
  title: {
    marginTop: 30,
    marginLeft: 15,
    color: '#05375a',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 20,
    // fontFamily: 'BreeSerif',
  },
  text: {
    paddingVertical: 30,
    color: '#05375a',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  searchBar: {
    flexDirection: 'row',
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});