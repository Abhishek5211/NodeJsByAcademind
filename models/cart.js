const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, price) {
    let cart = { products : [], totalPrice:0 }
    fs.readFile(p, (error, fileContent) => {
      if (!error) {
        cart = JSON.parse(fileContent);
        const existingProd = cart.products.find((prod) => prod.id === id);
        const existingProdIndex = cart.products.findIndex(
          (prod) => prod.id === id
        );
        let updatedProducts;
        if (existingProd) {
          updatedProducts = { ...existingProd };
          updatedProducts.qty = updatedProducts.qty + 1;
          cart.products[existingProdIndex] = updatedProducts;
        } else {
          updatedProducts = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProducts];
        }
        cart.totalPrice = +price + cart.totalPrice;
        fs.writeFile(p, JSON.stringify(cart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (error, fileContent) => {
      if (!error) {

       let cart = JSON.parse(fileContent);
      const existingProd = cart.products.find((prod) => prod.id === id);
      if(!existingProd)
      return;
      const existingProdIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      let updatedProducts;
      if (parseInt((existingProd.qty)) > 1) {
        updatedProducts = { ...existingProd };
        updatedProducts.qty = parseInt(updatedProducts.qty) - 1;
        cart.products[existingProdIndex] = updatedProducts;
      } else {
        cart.products = cart.products.splice(existingProdIndex,1);
      }
      cart.totalPrice = parseFloat(cart.totalPrice) - parseFloat(price);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    }
    });
  }

  static getCart(cb){
    fs.readFile(p, (error, fileContent)=>
    {
      if(!error){
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
      else 
      cb(null);
    });
  }
};
