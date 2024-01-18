const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((e) => console.log(e));
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId).then(([prd]) => {
    Cart.addProduct(prodId, prd[0].price);
  });
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  const cartProducts = [];
  Cart.getCart((cart) => {
    Product.fetchAll()
      .then(([products, fieldData]) => {
        for (product of products) {
          const cardProdData = cart.products.find(
            (prod) => prod.id == product.id
          );
          if (cardProdData) {
            cartProducts.push({ productData: product, qty: cardProdData.qty });
          }
        }
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: cartProducts,
        });
      })
      .catch((e) => console.log(e));
  });
};

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId).then(([prd]) => {
    Cart.deleteProduct(prodId, prd[0].price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchById(prodId)
    .then(([prd]) => {
      res.render("shop/product-detail", {
        path: "/product-detail",
        pageTitle: prd[0].title,
        product: prd[0],
      });
    })
    .catch((e) => console.log(e));
};
