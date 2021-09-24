const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const mercadopago = require('mercadopago');
const transporter = require('../config/mailer')
const Product = require("../models/Product.js");
const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Review = require("../models/Review.js");
const Role = require("../models/Role");
const nodemailer = require("nodemailer");
var fs = require('fs');
var handlebars = require('handlebars');




/* const ofertas = require("../../client/src/media/ofertas") */
const stripe = require("stripe")(
  "sk_test_51JZ13AKV5aJajepCH0cWNmrm69oEt7ELzgHQqnqpRIuoWCB74qaFEQ7t9tfSuzVpesIDMOOx4ajdjzyo5NaIDLFB00yNprdq65"
);

// mercadopago configuration
mercadopago.configure({
  access_token: 'TEST-1294034537296050-020319-656eec508b141c98a397a25ddd2684c7-184851111',
});

// Private key
const dotenv = require("dotenv");
dotenv.config();

const {ID_ROLE_USER} = process.env;


const services = require("../services/services");

const sendMail = async (req, res) =>{
  // Factura
  const {firstName,lastName, address1, email, amount, items} = req.body;      
  const emailclient = email;
  
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
    from: "'E-Market'<shanie.fadel60@ethereal.email> ",
    to: emailclient,
    subject: "Invoice e-market",
    html : htmlToSend
    };
    transporter.sendMail(mailOption, (error,info)=>{
          if(error){
            res.status(500).send(error.message);
          }else{
            res.status(200).json(info)
            console.log("Email enviado", info.response);
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

const getProducts = async (req, res, next) => {
  console.log("acaaaaaaaaaaaaaaaaaaaaaaaaa", ID_ROLE_USER);
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
      }).populate("order", {status: 1});
      if (userFind.length) {
        res.status(200).json(userFind);
      } else {
        res
          .status(200)
          .json([{ error: "No se encontró el usuario solicitado" }]);
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
    if (req.params.id) {
      const { name, price, description, countInStock, imageUrl, featured, discount, category } = req.body;
      const product = await Product.findById(req.params.id);
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
    console.log(err);
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
  const { id } = req.params;
  const findd = await Category.findById(id);
  res.json(findd);
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
      const catego = await Category.findById(_id);
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
    let createReview = await Review.create(req.body);
    res.status(200).send("Comentario agregado");
  } catch (err) {
    return err;
  }
};
const getReviews = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let reviewFind = await Review.find({ name: req.query.user }).populate(
        "product",
        {
          name: 1,
        }
      );
      if (reviewFind) {
        res.status(200).json(reviewFind);
      } else {
        res.status(404).send("Review no encontrada");
      }
    } else {
      let reviewFind = await Review.find().populate("product", {
        name: 1,
      });
      res.status(200).json(reviewFind);
    }
  } catch (err) {
    return err;
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  const findd = await Review.findById(id);
  res.json(findd);
};

const logUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await User.encryptPassword(password),
      role: [{ _id: ID_ROLE_USER }],
    });

    const saveUser = await newUser.save();
    const token = jwt.sign(
      { id: saveUser._id },
      /* `${process.env.JWT_SECRET_KEY}` */ 'secret',
      {
        expiresIn: 3600, //una hora expira el token
      }
    );

    res.status(200).json(token);
  } catch (err) {
    return err;
  }
};

const logIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "role",
    { name: 1 }
  );

  if (!userFound) return res.status(404).json({ message: "El usuario o la contraseña son inválidos" });

  const matchPassword = await User.matchPassword(req.body.password, userFound.password);
  
  if (!matchPassword) return res.status(401).json({ message: "El usuario o la contraseña son inválidos" });
    
  const token = jwt.sign({ id: userFound._id, role: userFound.role }, 'secret', {expiresIn: 36000});

  userFound.expiredLogin = userFound.expiredLogin + 1

  await userFound.save()
  
  res.json({ token });
};

const updateUser = async (req, res) => {
  if (req.params.id) {
    await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      phone: req.body.phone,
      discount: req.body.discount,
      address_line1: req.body.address_line1,
      address_line2: req.body.address_line2,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code,
      country: req.body.country,
      role: [{ _id: req.body.role }],
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
  const { name } = req.query;
  try {
    if (req.query.name) {
      let roleFind = await Role.find({ name: req.query.name });
      if (roleFind) {
        res.status(200).json(roleFind);
      } else {
        res.status(200).json([{ error: "No se encontró el rol solicitado" }]);
      }
    } else {
      const roleFind = await Role.find({});
      res.status(200).json(roleFind);
    }
  } catch (err) {
    return err;
  }
};

const productStock = async (req, res) => {
  const { id, qty } = req.params;

  try {
    if (id) {
      const product = await Product.findById(id);
      product.countInStock = product.countInStock - qty;

      await product.save();

      
      res.status(200).send("El stock fue actualizado");
    } else {
      res.status(404).send("No se pudo actualizar el stock");
    }
  } catch (err) {
    return err;
  }
};

const checkout = async (req, res) => {
  const { id, amount } = req.body;

  // res.send("Recibido Stripe");
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: "ecommerce henry products",
      payment_method: id,
      confirm: true,
    });
    // res.send("Pago procesado");
    if (payment.cancellation_reason == null) {
      res.status(200).json(payment.status);
    } else {
      res.status(200).json({ rejected });
    }
  } catch (error) {
    return res.json({ message: "Error en su tarjeta 2" });
  }
};

const resetPassword = async (req, res) => {
 try {
  crypto.randomBytes(32,async(err,buffer) => {
    if(err) {
      console.log(err)
    }
    const token = buffer.toString('hex')

    const user = await User.findOne({ email: req.body.email })
    
    if(!user) {
      return res.status(422).json({message: 'No hay ningún usuario registrado con ese email'})
    }
    user.resetToken = token
    user.expireToken = Date.now() + 3600000

    await user.save()
    
    const verificationLink = `http://localhost:3000/login/resetPassword/${token}`
      await transporter.sendMail({
        to: user.email,
        from: 'supermarkethenry@gmail.com',
        subject: 'Password reset',
        html: `<p>You requested for password reset</p>
        <b>Por favor hacer click en el siguiente enlace para poder continuar con la recuperación de su contraseña:</b>
        <a href="${verificationLink}">${verificationLink}</a>`
      })
      res.json({message: 'Por favor, verificar su casilla de mail'})
  })
 } catch(error) {
   console.log('No se ha podido restablecer la contraseña')
 }
}

const confirmPassword = async (req, res) => {
  
  const { token } = req.params
  const { password } = req.body
  try {
    const user = await User.findOne({resetToken: token})
    
  if(!user) {
    return res.status(422).json({message: 'El enlace no es correcto'})
  }
  
  user.password = await User.encryptPassword(password)
  await user.save()

  res.send(200).json({message: 'Su contraseña ha sido modificada con éxito'})

  } catch(error) {
    console.log('Error al cambiar la contraseña')
  }
}

const setSubscription = async(req, res) => {
  const { id } = req.body

  if(id) {
    await User.findByIdAndUpdate(id, {
    subscription: true
  })
  res.status(200).send("El usuario ha sido suscripto");
  } else {
    res.status(404).send("El usuario no fue encontrado");
  }
};

const checkLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
  
  if(!user) {
    return res.status(422).json({message: 'Usuario no encontrado'})
  } else {
    res.sendStatus(200)
  }
  } catch(error) {
    console.log('Error en la solicitud de usuario')
  }
  
}

const sendEmail = async (req, res) => {
  const users = req.body
  try {
    users.map(u => {
       transporter.sendMail({
        to: u.email,
        from: 'supermarkethenry@gmail.com',
        subject: 'Tenemos las mejores ofertas para vos',
        html: '<img src="https://firebasestorage.googleapis.com/v0/b/e-market-838a5.appspot.com/o/product_images%2Fofertas.png?alt=media&token=4fe8d93d-ce3a-4c74-92ee-9e4554cec474"/>',
        /* attachments: [{
            filename: 'image.png',
            path: '/path/to/file',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }] */
      })
    })
    
    res.json({message: 'Email de suscripción enviado correctamente'})
  } catch(error) {
    console.log('Error al enviar el mail')
  }
}

const sendEmailCheckout = async (req, res) => {
  try {
    const user = User.findById(req.params)
    /* console.log('ESTE ES EL USER REQ BODY', req.body._id) */
    console.log('ESTE ES EL USER', user)

    transporter.sendMail({
      to: user.email,
      from: 'supermarkethenry@gmail.com',
      subject: 'Tu compra ha sido confirmada',
      html: '<img src="https://firebasestorage.googleapis.com/v0/b/e-market-838a5.appspot.com/o/product_images%2Fcompra.png?alt=media&token=2a63364e-714c-4f9b-ad4f-97d6e0e19cfa"/>'
    })
    res.json({message: 'Email de confirmación de pago enviado correctamente'})
  } catch(error) {
    console.log('Error al enviar el email')
  }
}

const mercadopagoController = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const items = cart.map(({ name, price, qty }) => ({
      title: name,
      unit_price: Number(price),
      quantity: Number(qty),
    }));

    const preference = {
      items,
      back_urls: {
        success: 'http://localhost:3000',
        failure: 'http://localhost:3000',
        pending: 'http://localhost:3000',
      },
      auto_return: 'approved',
    };

    const { body } = await mercadopago.preferences.create(preference);
    res.status(200).json(body);
  } catch (err) {
    next(err);
  }
};

const loginGoogle = async(req, res) => {
  const { email, firstName, lastName } = req.body
  
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "role",
      { name: 1 }
    );
    
    if(user) {
      
      const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {expiresIn: 3600});
      console.log('ESTE ES EL TOKEN', token)
      res.json({token})

    } else {
      
      const newUser = new User({
        firstName,
        lastName,
        email,
        role: [{ _id: ID_ROLE_USER }],
      });
      
      const saveUser = await newUser.save();
      const token = jwt.sign(
        { id: saveUser._id, role: saveUser.role },
        'secret',
        {
          expiresIn: 3600, //una hora expira el token
        }
      );
      console.log('ESTE ES EL TOKEN', token)
      res.json({token});
    }
    
  } catch(error) {
    console.log('No se encontró el usuario solicitado')
  }
};

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
  productStock,
  resetPassword,
  setSubscription,
  confirmPassword,
  checkLogin,
  sendEmail,
  sendEmailCheckout,
  mercadopagoController,
  loginGoogle,
  sendMail
};


