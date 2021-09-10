const jwt = require("jsonwebtoken");
const config = require("../config");
const Product = require("../models/Product.js");
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Review = require("../models/Review.js");
const Role = require("../models/Role");

const getProducts = async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      let productFind = await Product.find({
        name: { $regex: name, $options: "i" },
      }).populate("category", { name: 1 });
      //   'name': { $regex: name, $options: "i" },
      // }).populate("category", { name: 1, _id: 1});
      if (productFind.length) {
        res.status(200).json(productFind);
      } else {
        res.status(200).json([{error:"No se encontró el producto solicitado"}]);
        
      }
    } else {
      const productFind = await Product.find({}).populate("category", {
        name: 1,
      });
      res.status(200).json(productFind);
    }
  } catch (err) {
    return err;
  }
};

const createProduct = async (req, res) => {
  console.log("QUE PASAAAAAA: ", req.body);
  try {
    await Product.insertMany(req.body);
    res.status(200).send("productos creados ok");
  } catch (err) {
    return err;
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
  console.log(id);
  try {
    const productId = await Product.findById(id);
    res.status(200).json(productId);
  } catch (err) {
    return err;
  }
};

const getUsers = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let userFind = await User.find({ name: `${name}` });
      if (userFind.length) {
        res.status(200).json(userFind);
      } else {
        res.status(400).send("No se encontró el producto solicitado");
      }
    } else {
      let userFind = await User.find();
      res.status(200).json(userFind);
    }
  } catch (err) {
    return err;
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.send("Producto eliminado");
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    if (id) {
      const { name, price, description, countInStock, imageUrl, featured, discount, category } = req.body;
      const product = await Product.findById(id);
      product.name = name;
      product.price = price;
      product.description = description;
      product.countInStock = countInStock;
      product.imageUrl = imageUrl;
      product.featured = featured;
      product.discount = discount;
      product.category = category;

      await product.save();
      
      res.status(200).send("El producto fue actualizado");
    } else {
      res.status(404).send("El producto no fue encontrado");
    }
  } catch (err) {
    return err;
  }
};

const modifiedCategory = (idProducto, idCategory) => {
  const product = Product.findById({ idProducto }).stringify();
  const category = product.category;

  console.log(product.name);

  category.includes(idCategory) ? category : category.push(idCategory);
};

const getCategory = async (req, res) => {
  const { category } = req.query;
  try {
    if (category) {
      let categoryFind = await Category.find({
        category: { $regex: name, $options: "i" },
      });
      if (categoryFind.length) {
        res.status(200).json(categoryFind);
      } else {
        res.status(404).send("Categoría no encontrada");
      }
    } else {
      let categoryFind = await Category.find();
      res.status(200).json(categoryFind);
    }
  } catch (err) {
    return err;
  }
};

const createCategory = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    let categoryFind = await Category.findOne({ name: `${name}` });
    if (categoryFind !== null) {
      res.status(200).json({ msg: "La categoría ya existe" });
    } else {
      await Category.insertMany(req.body);
      res.status(200).send("Su categoría ha sido creada");
    }
  } catch (err) {
    return err;
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Category.findByIdAndDelete({ id });
      res.status(200).send("La categoría ha sido eliminada");
    } else {
      res.send("La categoría ingresada no existe");
    }
  } catch (err) {
    return err;
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Category.updateOne({ id });
      res.status(200).send("La categoría ha sido actualizada");
    } else {
      res.status(404).send("La categoría ingresada no existe");
    }
  } catch (err) {
    return err;
  }
};

const createReviews = async (req, res) => {
  console.log("ESTE ES EL BODY", req.body);
  /* const { name, comment } = req.body */
  try {
    let createReview = await Review.create(
      req.body /* name: `${name}`, comment: `${comment}` */
    );
    res.status(200).send("Comentario agregado");
  } catch (err) {
    return err;
  }
};

const logUp = async (req, res) => {
  console.log(req.body)

  const { firstName, lastName, email, password, roles } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const findRoles = await Role.find({ name: `${roles}` });
      newUser.roles = findRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" }); // busco un solo usuario
      newUser.roles = [role._id];
      

    const saveUser = await newUser.save();
    console.log("ESTE ES EL FIND ROLES", saveUser);
  }
    const token = jwt.sign(
      { id: saveUser._id },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: 3600, //una hora expira el token
      }
    );
    res.status(200).json({ token });
    console.log('ESTE ES EL TOKEN', token)
  } catch (err) {
    return err;
  }
};

const logIn = async (req, res) => {
  
  const userFound = await User.findOne({ email: req.body.email }).populate("role", { name: 1 });

  if (!userFound)
    return res.status(400).json({ message: "El usuario no existe" });

  const matchPassword = await User.matchPassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });
  const token = jwt.sign({ id: userFound._id },`${process.env.JWT_SECRET_KEY}`, {
    expiresIn: 3600,
  });
  
  res.json({ token });
};

const updateUser = async (req, res) => {
  
  try {
    console.log('ESTOY ENTRANDO')
    if (req.params.id) {
      await User.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        discount: req.body.discount,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        country: req.body.country,
        /* role: modifiedRole(req.body.id, req.body.role), */
      });
      res.status(200).send("El usuario fue actualizado");
    } else {
      res.status(404).send("El usuario no fue encontrado");
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductsById,
  removeProduct,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  updateProduct,
  createReviews,
  logIn,
  logUp,
  updateUser,
  
};






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
