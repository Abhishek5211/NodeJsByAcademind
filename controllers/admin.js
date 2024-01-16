const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.fetchById(prodId, product=> {
    if(!product)
    res.redirect('/');
    else {res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      editing:editMode,
      product:product
    });}
  });
 
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    console.log(id);
    const product = new Product(id, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.getDeleteProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.fetchById(prodId, product=> {
    if(!product)
    res.redirect('/');
    else {
      Product.delete(prodId);
      res.redirect('/admin/products');
    }
  });
}
