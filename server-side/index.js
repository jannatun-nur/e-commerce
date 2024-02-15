const express= require('express')
const cors = require('cors')
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const uri = "mongodb+srv://e-commerce:jjrKmfA4bpBgemAP@cluster0.mrivhtb.mongodb.net/?retryWrites=true&w=majority";

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
    const buyCollection = client.db("e-commerce").collection("buynow")
    const addToCartCollection = client.db("e-commerce").collection("mycart")

    // get method
    app.get('/get-buy' , async(req ,res)=>{
      const alllbuy = await buyCollection.find().sort({_id:-1}).toArray()
      res.send(alllbuy)
     })

    //  single get method
     app.get('/one-buy/:id', async(req ,res)=>{
      const id = req.params.id
      console.log(id);
      const query = {_id : new ObjectId(id)}
      const result = await buyCollection.findOne(query)
      res.send(result)
     })
// post method

app.post('/post-buy' , async(req , res)=>{
  const buyNow = req.body
  console.log('post done', buyNow);
  const result = await buyCollection.insertOne(buyNow)
  res.send(result)
})

// delete method
app.delete('/dlt-buy/:id' , async(req , res )=>{
  const id = req.params.id
  console.log(id);
  const query = {_id: new ObjectId(id)}
  const result = await buyCollection.deleteOne(query)
  res.send(result);
})

// ADD TO CART API METHOD

// get method
app.get('/get-cart' , async(req ,res)=>{
  const cart = await addToCartCollection.find().sort({_id:-1}).toArray()
  res.send(cart)
 })

// POST METHOD
app.post('/post-addtocart' , async(req , res)=>{
  const buyNow = req.body
  console.log('post done', buyNow);
  const result = await addToCartCollection.insertOne(buyNow)
  res.send(result)
})

// delete method
app.delete('/dlt-cart/:id' , async(req , res )=>{
  const id = req.params.id
  console.log(id);
  const query = {_id: new ObjectId(id)}
  const result = await addToCartCollection.deleteOne(query)
  res.send(result);
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("successfully connect with mongodb");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



























app.get('/', (req, res)=>{
    res.send('e-commerce is going well.')
})
app.listen(port, ()=>{
    console.log(`ok in git bash ${port}`);
})
