const jwt = require("jsonwebtoken");
const config = require("../config");
const Product = require("../models/Product.js");
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Review = require("../models/Review.js");
const Role = require("../models/Role");
const stripe = require("stripe")("sk_test_51JYn4nDpSNCyvuRizsfvAUMBg1KU0WYv6Qihrip7VekY3nrHGOpnDATg5h4VhDLkgGvuhHT5pEEr7ZBkCYRoGv2d00QRjqu6Sb");
// Private key
const nodemailer = require("nodemailer");
const services = require('../services/services');
var fs = require('fs');
var handlebars = require('handlebars');

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
        res.status(200).json([]);
        
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
  try {
    await Product.insertMany(req.body);
    res.status(200).send("productos creados ok");
  } catch (err) {
    return err;
  }
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await Product.findById(id);
    res.status(200).json(productId);
  } catch (err) {
    return err;
  }
};

const getUsers = async (req, res) => {
  const { email } = req.query;
  try {
    if (email) {
      let userFind = await User.find({
        email: { $regex: email, $options: "i" },
      }).populate("role", { name: 1 });
      if (userFind.length) {
        res.status(200).json(userFind);
      } else {
        res.status(200).json([{error:"No se encontró el usuario solicitado"}]);
        
      }
    } else {
      const userFind = await User.find({}).populate("role", {
        name: 1,
      });
      res.status(200).json(userFind);
    }
  } catch (err) {
    return err;
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await User.findById(id).populate("role", {
      name: 1,
    });
    res.status(200).json(userId);
  } catch (err) {
    return err;
  }
};
  /* const { email } = req.query;
  try {
      let userFind = await User.find({ onst getUsers = async (req, res) => {
  const {email } = req.query;
  try {
    if (email) {
      let userFind = await User.find({
        email: { $regex: email, $options: "i" },
      }).populate("role", { name: 1 });
      if (userFind.length) {
        res.status(200).json(userFind);
      } else {
        res.status(200).json([{error:"No se encontró el usuario solicitado"}]);
        
      }
    } else {
      const userFind = await User.find({}).populate("role", {
        name: 1,
      });
      res.status(200).json(userFind);
    }
  } catch (err) {
    return err;
  }
};});
      if (userFind.length) {
        res.status(200).json(userFind);
      } else {
        res.status(400).send("No se encontró el producto solicitado")
  } 
  } catch (err) {
    return err;
  }
};
 */
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

const getCategoryById = async (req, res) => {
  const {id} = req.params
  const findd = await Category.findById(id)
  res.json(findd)
}

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
      await Category.findByIdAndDelete(id);
      res.status(200).send("La categoría ha sido eliminada");
    } else {
      res.send("La categoría ingresada no existe");
    }
  } catch (err) { 
    return err;
  }
};

const updateCategory = async (req, res) => {
  const { _id, name, description, image } = req.body;
  try {
    if (_id) {
      const catego = await Category.findById(_id );
      catego.name = name;
      catego.description = description;
      catego.image = image;

      await catego.save();

      res.status(200).send("La categoría ha sido actualizada");
    } else {
      res.status(404).send("La categoría ingresada no existe");
    }
  } catch (err) {
    return err;
  }
};

const createReviews = async (req, res) => {
  
  try {
    let createReview = await Review.create(
      req.body
    );
    res.status(200).send("Comentario agregado");
  } catch (err) {
    return err;
  }
};
const getReviews = async (req, res) => {
  const {name} = req.query;
  try {
    if (name) {
      let reviewFind = await Review.find({name: req.query.user},
      ).populate("product", {
        name: 1,
      });;
      if (reviewFind) {
        res.status(200).json(reviewFind);
      } else {
        res.status(404).send("Review no encontrada");
      }
    } else {
      let reviewFind = await Review.find().populate("product", {
        name: 1,
      });;
      res.status(200).json(reviewFind);
    }
  } catch (err) {
    return err;
  }
};

const getReviewById = async (req, res) => {
  const {id} = req.params
  const findd = await Review.findById(id)
  res.json(findd)
}

const logUp = async (req, res) => {
  const { firstName, lastName, email, password, } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await User.encryptPassword(password),
      role:[{_id:"613b80dc8317c3f59f461b67"}]
    });

/*     if (roles) {
      const findRoles = await Role.find({ name: `${roles}` });
      newUser.roles = findRoles.map((role) => role._id);
      console.log('estoy entrando al if')
    } else {
      const role = await Role.findOne({ name: "user" }); // busco un solo usuario
      newUser.roles = [role._id]; */
      
    const saveUser = await newUser.save();
  /* } */

    /* newUser.save((err) => {
      if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`})

      return res.status(200).send({token: services.createToken(user)})
    }) */
   /*  const token = jwt.sign({
      name: newUser.name,
      id: saveUser._id
    }, 'secret')

    res.header('auth-token', token).json({
      error: null,
      data: { token },
      message: 'Bienvenido'
  })
 */
    const token = jwt.sign(
      { id: saveUser._id },
      `${process.env.JWT_SECRET_KEY}` /* 'secret' */,
      {
        expiresIn: 3600, //una hora expira el token
      }
    );
    console.log('ESTE ES EL TOKEN DEL USUARIO')
    res.status(200).json(token);
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
    if (req.params.id) {
      await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
        role: [{_id: req.body.role}],
      });
      res.status(200).send("El usuario fue actualizado");
    } else {
      res.status(404).send("El usuario no fue encontrado");
    }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.send("Usuario eliminado");
  } catch (error) {
    console.log(error);
  }
};
const getRoles = async (req, res) => {
  const {name} = req.query;
  try {
    if (req.query.name) {
      let roleFind = await Role.find( {name: req.query.name} )
      if (roleFind) {
        res.status(200).json(roleFind);
      } else {
        res.status(200).json([{error:"No se encontró el rol solicitado"}]);
      }
    } else {
      const roleFind = await Role.find({})
      res.status(200).json(roleFind);
     } 
  } catch (err) {
    return err;
  }
};

const checkout = async (req, res) =>{
  const { id, amount } = req.body;
  try{

  // res.send("Recibido Stripe");
  
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency:"usd",
      description: "ecommerce henry products",
      payment_method:id,
      confirm:true,
    })

    // res.send("Pago procesado");
    if(payment.cancellation_reason == null){
      res.status(200).json(payment.status)
    } else {
      res.status(200).json({rejected})
     
    }
  }catch(error){
    return res.json({message: "Error en su tarjeta 2"});
    console.log(error)
  }
}
  const sendMail = async (req, res) =>{
          // Factura
          const {firstName,lastName, address1, email, amount, items} = req.body;      
          const emailclient = email;
          const size = items.length;

          // const contentHtml =`
          //   <h1>Invoice</h1>
          //   <h4>¡Gracias por tu compra ${firstName}! </h4>
          //   <p>A continuacion los detalles de tu compra:</p>
          //   <br>
          //   <ul>
          //     <il>Name: ${firstName}</il>
          //     <il>Last Name: ${lastName}</il>
          //     <il>Address: ${address1}</il>
          //     <il>Email: ${email}</il>
          //   </ul>
          //   <p>¡Gracias por tu compra </p>
          // `;
        try{
          // Fs
          var readHTMLFile = function(path, callback) {
            fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };
        // FS
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'supermarkethenry@gmail.com', // generated ethereal user,
                pass: 'pcozgycvxiqwttuu', // generated ethereal password
            }
        });
         // FS
         readHTMLFile(__dirname + '/template_email.html', function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            firstName: firstName,
            lastName: lastName,
            address1: address1,
            email: email,
            amount: amount,
            items: items
          };
          var htmlToSend = template(replacements);
          let mailOption = {
            from: "'E-MArket'<shanie.fadel60@ethereal.email> ",
            to: emailclient,
            subject: "Invoice e-market",
            html : htmlToSend
            };
            transporter.sendMail(mailOption, (error,info)=>{
                  if(error){
                    res.status(500).send(error.message);
                  }else{
                    console.log("Email enviado", info);
                    // res.status(200).json(req.body);
          
                  }
                });
        });
          // FS

        transporter.verify().then(() => {
          console.log('Ready for send')
        })
        



        //  const info = await transporter.sendMail(mailOption, (error,info)=>{
        //     if(error){
        //       res.status(500).send(error.message);
        //     }else{
        //       console.log("Email enviado", info);
        //       // res.status(200).json(req.body);
    
        //     }
        //   });


          transporter.verify(function(error, success) {
            if (error) {
             console.log(error);
            } else {
             console.log('Server is ready to take our messages');
            }
            }); 
        }catch(error){
          return res.json({message: "Error en envio de mail"});
          console.log(error);
        } 
          };
    // const email_template =  (req, res) =>{
    //   res.render(`product/templates/email/${req.params.template}`, {
    //     data: req.body        
    //   })
    // }      

  

module.exports = {
  getProducts,
  createProduct,
  getProductsById,
  removeProduct,
  getCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  updateProduct,
  createReviews,
  logIn,
  logUp,
  updateUser,
  checkout,
  getUsers,
  getUserById,
  removeUser,
  getRoles,
  getReviews,
  getReviewById,
  sendMail,

  
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
