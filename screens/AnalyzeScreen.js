import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import apiReq from '../utils/axios';
import { SearchBar } from 'react-native-elements';
const jsonURL = "https://infobroker.herokuapp.com/api/stock/getCurrStockData?symbol=AAPL";

const AnalyzeScreen = () => {

  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // console.log("aa");
    // // setData({ loading: true })
    // const response = await apiReq.get('/stock/getCurrStockData?symbol=AAPL')
    // // console.log(response.data.stocks);
    // setData({ loading: false })
    // console.log(".");

    // fetch("https://infobroker.herokuapp.com/api/stock/getCurrStockData?symbol=AAPL", {
    //   method: "GET",
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log(data.stocks.symbol);

    //     setData({
    //       "symbol": data.stocks.symbol,
    //       "longName": data.stocks.longName,
    //       "regularMarketDayHigh": data.stocks.regularMarketDayHigh,
    //       "regularMarketDayLow": data.stocks.regularMarketDayLow,
    //       "regularMarketDayRange": data.stocks.regularMarketDayRange,
    //       "regularMarketVolume": data.stocks.regularMarketVolume,
    //       "regularMarketOpen": data.stocks.regularMarketOpen,
    //       "fiftyDayAverage": data.stocks.fiftyDayAverage,
    //       "marketState": data.stocks.marketState,
    //       "averageAnalystRating": data.stocks.averageAnalystRating,
    //       "regularMarketPreviousClose": data.stocks.regularMarketPreviousClose,
    //       "fiftyTwoWeekRange": data.stocks.fiftyTwoWeekRange
    //     }
    //     )

    //   }).catch((err) => alert(err))
    //   .finally(setLoading(false));


    fetch(jsonURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.stocks);
        console.log(json.stocks);
      })

    // .catch((err) => alert(err))
    // .finally(() => setLoading(false));
  }, []);
  const resp = () => { (console.log(search)) };

  return (
    <SafeAreaView style={styles.container}>
      {data.length < 1 ? <ActivityIndicator /> :
        <View>
          <Text style={styles.title}>Stock Analysis</Text>
          {/* <View
            style={styles.searchBar}>
            <Feather
              name="search"
              size={20}
              color="#C6C6C6"
              style={{ marginRight: 5 }}
            />
            <TextInput placeholder="Search Symbol" />
          </View> */}
          <View style={styles.view}>
            <SearchBar
              placeholder="Search Symbol"
              onChangeText={(val) => { setSearch(val); resp() }}
              value={search}

            ></SearchBar>



          </View>

          <FlatList
            data={data}
            keyExtractor={(item, index) => { return item.symbol }}
            renderItem={({ item, index }) => (
              <View>
                <View style={styles.text}>
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

                {/* <Text style={styles.text}>
                  Symbol: {item.symbol}{"\n"}
                  Name: {item.longName}{"\n"}
                  Day's High: {item.regularMarketDayHigh}{"\n"}
                  Day's Low: {item.regularMarketDayLow}{"\n"}
                  Day's Range: {item.regularMarketDayRange}{"\n"}
                  Volume: {item.regularMarketVolume}{"\n"}
                  Open: {item.regularMarketOpen}{"\n"}
                  Previous Close: {item.regularMarketPreviousClose}{"\n"}
                  50 Day Average: {item.fiftyDayAverage}{"\n"}
                  52 Week Range: {item.fiftyTwoWeekRange}{"\n"}
                  Recommendation Rating: {item.averageAnalystRating}{"\n"}
                  Market State: {item.marketState}{"\n"}
                </Text> */}
              </View>
            )}
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
  searchBar: {
    flexDirection: 'row',
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});