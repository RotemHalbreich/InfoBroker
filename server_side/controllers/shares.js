


const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = ""
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.companyProfile({'symbol': 'AAPL'}, (error, data, response) => {
  console.log(data)
});


// should get from outer API
const getAllNews = (req, res)=>
{
    res.send('all news')
}


//should send all information about the specified share -> first from the api
const getShareDtl = (req, res)=>{
    res.send("share datails")
}




module.exports ={
    getAllNews,
    getShareDtl
}
