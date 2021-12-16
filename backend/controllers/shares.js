


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
