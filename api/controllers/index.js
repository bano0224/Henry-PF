const Product = require('../models/Product.js')
const User = require('../models/User.js')
const Category = require('../models/Category.js')

const getProducts = async (req, res, next) => {
  const { name } = req.query;
  try {
    if(name) {
      let productFind = await Product.find({'name': { $regex: name, $options:'i' }}).populate('category', {name:1});
      if(productFind.length) {
          res.status(200).json(productFind)
      } else {
          res.status(400).send('No se encontró el producto solicitado')
      }
    } else {
      const productFind = await Product.find({}).populate('category', { name: 1 })
      res.status(200).json(productFind)
    }
  } catch (err) {
      return err
  }
}

const createProduct = async (req, res) => {
  try {
      await Product.insertMany(req.body)
      res.status(200).json("productos creados ok");
  } catch (err) {
      return err
  }
};

//PRUEBA JOIN
// const createProduct = async (req, res) => {
//     try {
//       console.log('entre')
//         await Product.create(req.body)
//         res.status(200).json("productos creados ok");
//     } catch (err) {
//         return err
//     }
//   };

const getProductsById = async (req, res) => {
    const { id } = req.params;
    try {
      const productId = await Product.findById(id);
      res.status(200).json(productId);
    } catch(err) {
      return err
    }
};

const getUsers = async (req, res) => {
  const { name } = req.query;
    try { 
      if(name) {
          let userFind = await User.find({name: `${name}`})
          if(userFind.length) {
              res.status(200).json(userFind);
          } else {
              res.status(400).send('No se encontró el producto solicitado')
          }
      } else {
        let userFind = await User.find();
        res.status(200).json(userFind)
      }
    } catch (err) {
      return err
    }
}

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id)
    res.send('Producto eliminado')
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = async (req, res) => {
  try {
    if(req.body.id) {
      await Product.findByIdAndUpdate(req.body.id, {
        name: req.body.name, 
        price: req.body.price,
        description: req.body.description,
        countInStock: req.body.countInStock,
        imageUrl: req.body.imageUrl,
        featured: req.body.featured,
        discount: req.body.discount,
        // category: [...category,req.body.category]
        category: modifiedCategory(req.body.id, req.body.category)
      })
      res.status(200).send('El producto fue actualizado')
    } else {
      res.status(404).send('El producto no fue encontrado')
    }
  } catch (err) {
    return err
  }
}

const modifiedCategory= (idProducto, idCategory) => {
  const product = Product.findById({idProducto}).stringify()
  const category = product.category

  console.log(product.name)

  category.includes(idCategory)
  ? category
  : category.push(idCategory)
}


const getCategory = async (req, res) => {
  const { category } = req.query 
  try {
      if(category) {
        let categoryFind = await Category.find({'category': { $regex: name, $options:'i' }});
        if(categoryFind.length) {
        res.status(200).json(categoryFind)
      } else {
        res.status(404).send('Categoría no encontrada')
      }
      } else {
      let categoryFind = await Category.find()
      res.status(200).json(categoryFind)
    }
  } catch (err) {
    return err
  }
}

const createCategory = async (req, res) => {
  const { name } = req.body
  try {
    let categoryFind = await Category.findOne({name})
    if(categoryFind !== null) {res.status(200).json({msg: 'La categoría ya existe'})}
    else {
      await Category.insertMany({"name":`${name}`}) //Agregar descripcion e imagen
      res.status(200).json("Su categoría ha sido creada");
    }
  } catch(err) {
    return err
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
    if(id) {
      await Category.findByIdAndDelete({id})
      res.status(200).send('La categoría ha sido eliminada')
    } else {
      res.send('La categoría ingresada no existe')
    }
  } catch(err) {
    return err
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params
  try {
    if(id){
      await Category.updateOne({id})
      res.status(200).send('La categoría ha sido actualizada')
    } else {
      res.status(404).send('La categoría ingresada no existe')
    }
  } catch(err) {
    return err
  }
};

module.exports = {
    getProducts,
    createProduct,
    getProductsById,
    getUsers,
    removeProduct,
    getCategory, 
    createCategory,
    deleteCategory,
    updateCategory,
    updateProduct
}

/* /* Voy pegando para el CRUD completo y despúes las adaptamos */
/* const polka = require('polka');
const { MongoClient } = require("mongodb");

polka() */
  
    
    /* async function run() {
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
    console.log(`> Running on localhost:3000`); */
  

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