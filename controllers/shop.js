const Cart = require("../models/cart");
const CartItems = require("../models/cart-items");
const Product = require("../models/product");
const Order = require("../models/order");
const OrderItems = require("../models/order-item");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
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
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) product = products[0];
      let newQty = 1;
      if (product) {
        const oldQty = product.cartItems.quantity;
        newQty = oldQty + 1;
        return fetchedCart.addProduct(product, {
          through: { quantity: newQty },
        });
      } else {
        return Product.findByPk(prodId).then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQty },
          });
        });
      }
    })
    .then(res.redirect("/cart"))
    .catch((e) => console.log(e));
};

exports.getCart = (req, res, next) => {
  const cartProducts = [];
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((prods) => {
      const prod = prods[0];
      return prod.cartItems.destroy();
    })
    .then(res.redirect("/cart"))
    .catch((e) => console.log(e));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders:orders
      });
    })
    .catch((e) => console.log(e));

};

exports.postOrders = (req, res, next) => {
  let cartId;
  req.user
    .getCart()
    .then((retrivedcart) => {
      cartId = retrivedcart.id;
      return retrivedcart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((p) => {
              p.orderItems = { quantity: p.cartItems.quantity };
              return p;
            })
          );
        })
        .then(() => {
          products.forEach((prod) => {
            prod.cartItems.destroy();
          });
        })
        .catch((err) => console.log(err));
    }). then(()=> res.redirect('\orders'))
    .catch((e) => console.log(e));

};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((prd) => {
      res.render("shop/product-detail", {
        path: "/product-detail",
        pageTitle: prd.title,
        product: prd,
      });
    })
    .catch((e) => console.log(e));
};
