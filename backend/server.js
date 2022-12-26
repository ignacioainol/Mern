import express from 'express'
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false).connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db');
}).catch(err => {
    console.log(err.message)
})

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not Found' });
    }
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === parseInt(req.params.id));

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not Found' });
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
})


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://iggnaxios:<password>@cluster0.y1lovks.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
