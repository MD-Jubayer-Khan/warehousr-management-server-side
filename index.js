const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.myfuo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      await client.connect()
      const productCollection = client.db('warehouseManagement').collection('items');

      // Get
      app.get('/item', async(req, res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const items = await cursor.toArray();
        res.send(items)
      });

      // Get
      app.get('/item/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const item = await productCollection.findOne(query);
        res.send(item)
      });

       // Update
      app.put('/item/:id', async(req, res) =>{
        const id = req.params.id;
        const qty = req.body.newQuantity;
        const filter = {_id: ObjectId(id)};
        const options = { upsert: true};
        const updatedDoc = {
            $set: {
                  quantity: qty
            }
        }
        const result = await productCollection.updateOne(filter, updatedDoc, options);
        res.send(result)
      });

      // Update
      app.put('/itemQ/:id', async(req, res) =>{
        const id = req.params.id;
        const qty = req.body.newQuantity;
        const filter = {_id: ObjectId(id)};
        const options = { upsert: true};
        const updatedDoc = {
            $set: {
                  quantity: qty
            }
        }
        const result = await productCollection.updateOne(filter, updatedDoc, options);
        res.send(result)
      });

            // POST
            app.post('/item', async(req, res) =>{
              const newItem = req.body;
              const result = await productCollection.insertOne(newItem);
              res.send(result);
          });

          // Delete
      app.delete('/item/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await productCollection.deleteOne(query);
        res.send(result);
    });
    }
    finally{

    }

}
run().catch(console.dir)



app.get('/', (req, res) =>{
    res.send('running warehouse management server ')
});

app.listen(port, ()=>{
    console.log('server running');
})