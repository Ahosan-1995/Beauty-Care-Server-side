const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Above are basic setup
// For env file
require ('dotenv').config();






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j8qj17k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const allDataCollection=client.db('assignment11DB').collection('assignment11');


    const purchaseCollection=client.db('assignment11DB').collection('purchaseDB');



    app.get('/assignment', async(req,res)=>{
        const cursor = allDataCollection.find()
        const results = await cursor.toArray();
        res.send(results);
    })


    app.get('/assignment/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await allDataCollection.findOne(query);
        res.send(result);
    })



    // Bellow section only for purchase collection................................

    app.post('/add_purchase',async(req,res)=>{
        const allData = req.body;
        console.log(allData);
    
        const result = await purchaseCollection.insertOne(allData);
        res.send(result);
    })


    app.get('/add_purchase', async(req,res)=>{
        const cursor = purchaseCollection.find()
        const results = await cursor.toArray();
        res.send(results);
    })









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req,res)=>{
    res.send('Assignment 11 sever is running')

})

app.listen(port, ()=>{
    console.log(`Assignment 11 sever is running: ${port}`)
})