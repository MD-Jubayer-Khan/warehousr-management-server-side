const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}1aTa6ZOOnkSL90xQ@cluster0.myfuo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('warehouse management DB connected ');
  // perform actions on the collection object
  client.close();
});


// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('running warehouse management server ')
});

app.listen(port, ()=>{
    console.log('server running');
})