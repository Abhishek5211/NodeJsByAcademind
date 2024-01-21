const Product = require("../models/product");

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
  req.user.findProductByPk(prodId).then((product) => {
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
  Product.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    userId: req.user.id
  }) 
    .then(res.redirect("/"))
    .catch((e) => console.log(e));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(res.redirect("/admin/products"))
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
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
  Product.findByPk(prodId).then((product) => {
    return product.destroy();
  }).then(res.redirect('/')).catch(e =>console.log(e));
};
