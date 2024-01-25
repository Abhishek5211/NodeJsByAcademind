const { getDb } = require("../util/mongodb");
const { ObjectId } = require("mongodb");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this._id = id ? new ObjectId(id) : null;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static fetchById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    const prodIds = this.cart.items.map((p) => p.productId);
    return db
      .collection("products")
      .find({ _id: { $in: [...prodIds] } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteCartItem(prodId) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== prodId.toString()
    );
    return db
      .collection("users")
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const orders = {
          user: { userId: this._id, name: this.name },
          products: [...products],
        };
        return orders;
      })
      .then((orders) => {
        return db
          .collection("orders")
          .insertOne(orders)
          .then((result) => {
            this.cart = { items: [] };
            db.collection("users").updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: this.cart } }
            );
          });
      })
      .catch((e) => console.log(e));
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders').find({'user.userId': new ObjectId(this._id)}).toArray();
  }
}

module.exports = User;
