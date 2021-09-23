const { Router } = require("express");
const {
  logIn,
  logUp,
  updateUser,
  getUsers,
  getUserById,
  removeUser,
  resetPassword,
  setSubscription,
  confirmPassword,
  checkLogin,
  sendEmail,
  sendEmailCheckout,
  addToWishList,
  loginGoogle
} = require("../controllers/index.js");

const server = Router();

server.post("/login", logIn);
server.get("/checkLogin", checkLogin);
server.post("/logup", logUp);
server.put("/update/:id", updateUser);
server.patch("/update/:token", confirmPassword);
server.get("/", getUsers);
server.get("/:id", getUserById);
server.delete("/delete/:id", removeUser);
server.post("/resetPassword", resetPassword);
server.post("/subscription", setSubscription);
server.post("/sendEmail", sendEmail);
server.post("/sendEmailCheckout/:id", sendEmailCheckout);
server.post("/addToWishList", addToWishList);
server.post("/loginGoogle", loginGoogle)

module.exports = server;
