const Product = require("../models/product");
const {ObjectId} = require('mongodb');

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.fetchById(prodId).then((product) => {
    if (!product) res.redirect("/");
    else {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
      });
    }
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log(req.user._id, "message");

  const p = new Product(title, description, price, imageUrl, req.user._id);
  p.save()
    .then(res.redirect("/"))
    .catch((e) => console.log(e));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.fetchById(id)
    .then((prodData) => {
      const product = new Product(title, description,price,imageUrl, req.user._id, id );
      return product.save();
    })
    .then(res.redirect("/admin/products"))
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.destory({where: {id:prodId}}).then( res.redirect("/")).catch(e=>console.log(e));
  Product.deleteById(prodId)
    .then(res.redirect("/"))
    .catch((e) => console.log(e));
};
