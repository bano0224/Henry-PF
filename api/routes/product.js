const { Router } = require("express");
const {
  getProducts,
  createProduct,
  getProductsById,
  removeProduct,
  updateProduct,
  productStock,
} = require("../controllers/index.js");
const server = Router();

server.get("/", getProducts);
server.post("/create", createProduct);
server.get("/:id", getProductsById);
server.delete("/delete/:id", removeProduct);
server.put("/update/:id", updateProduct);
server.put("/inStock/:id/:qty", productStock);

module.exports = server;
