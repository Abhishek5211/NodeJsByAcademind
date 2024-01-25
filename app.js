const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const { connectDb } = require("./util/mongodb");
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

connectDb((db) => {
   app.listen(3000);
});

app.use((req, res, next) => {
  User.fetchById("65b174a98a82ab5e8a5b04e3")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((e) => console.log(e));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
