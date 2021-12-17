
require('dotenv').config()
// require('express-async-errors')
const cors = require('cors');
const { firestore } = require("firebase-admin");

const express = require('express');
const bodyParser = require('body-parser')
//routers
const authRouter = require('./routes/auth')
const shareRouter = require('./routes/shares')

//

const app = express();




app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter)
app.use('/api/share', shareRouter)


const port = process.env.PORT || 5000;

const start = async () => {
    try {
      // await fs.firestore();
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
  