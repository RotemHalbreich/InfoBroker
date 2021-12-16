
require('dotenv').config()
require('express-async-errors')
const cors = require('cors');

const express = require('express');
//connect DB
const fs = require('./db/connect')

//routers
const authRouter = require('./routes/auth')
const shareRouter = require('./routes/shares')

//

const app = express();


app.use('/api/auth', authRouter)
app.use('/api/share', shareRouter)


app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());


const port = process.env.PORT || 5000;

const start = async () => {
    try {
      await fs.firestore();
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
  