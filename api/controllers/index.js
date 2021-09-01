const products = require('../data/data.js')
const Product = require('../models/Product.js')

const getProducts = async (req, res, next) => {
    try {
      const product = await Product.find();
      await res.status(200).json(product)
    } catch (err) {
        return err
    }
}

const getProductsByQuery = async (req, res, next) => {
    const { name } = req.query;
    const getAllProducts = products
    try {
        if(name) {
            let product = await products.filter(
                (p) => p.name.toLowerCase() === name.toLowerCase()
            );
            if(product.length) {
                res.status(200).json(product);
            } else {
                res.status(400).send('No se encontró el producto solicitado')
            }
        }
    } catch(error) {
        console.log('error en la búsqueda del producto')
    }
}


module.exports = {
    getProducts,
    getProductsByQuery
}

/* Voy pegando para el CRUD completo y despúes las adaptamos */
/* const polka = require('polka');
const { MongoClient } = require("mongodb");

polka()
  .get('/create', (req, res) => {
    const client = new MongoClient("mongodb://localhost:27017");
    async function run() {
      try {
        await client.connect();
        const database = client.db("intro");
        const collection = database.collection("quotes");

        const result = await collection.insertOne({"quote":"Life is what happens to you while you're busy making other plans."});
        res.end(JSON.stringify(result));
      } catch (e) {
        console.log("Error: " + e);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  }); */

/* .get('/update', (req, res) => {
    const client = new MongoClient("mongodb://localhost:27017");
    async function run() {
      try {
        await client.connect();
        const database = client.db("intro");
        const collection = database.collection("quotes");

        const updateDoc = {
          $set: {
            author:
              "John Lennon",
          },
        };

        const result = await collection.updateOne({}, updateDoc, {}); // <-- empty filter matches all docs
        res.end("Updated: " + result.modifiedCount);
      } catch (e) {
        errCallback(e);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  }) */