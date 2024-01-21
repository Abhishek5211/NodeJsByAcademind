const path = require("path");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItems = require("./models/cart-items");
const Order = require("./models/order");
const orderItems = require("./models/order-item");

const express = require("express");
const bodyParser = require("body-parser");

const sequalize = require("./util/sql");
const Sequealize = require("sequelize");

const errorController = require("./controllers/error");

const app = express();
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:orderItems});

Cart.belongsToMany(Product, { through: CartItems });
Product.belongsToMany(Cart, { through: CartItems });

sequalize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) return User.create({ name: "Deepak", email: "test@gmail.com" });
    else return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart ) => app.listen(3000))
  .catch((e) => console.log(e));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => console.log(error));
});
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
