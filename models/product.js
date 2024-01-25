const { getDb } = require("../util/mongodb");
const { ObjectId } = require("mongodb");

class Product {
  constructor(title, description, price, imageUrl, userId, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
    this._id = id ? new ObjectId(id) : null;
  }
  save() {
    const db = getDb();
    if (this._id) {
      return db.collection("products").updateOne(
        { _id: this._id },
        {
          $set: this
        }
      );
    }
    else
{    return db
      .collection("products")
      .insertOne(this)
      .then()
      .catch((e) => console.log(e));}
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .catch((e) => console.log(e));
  }

  static fetchById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next()
      .catch((e) => console.log(e));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(prodId) })
      .catch((e) => console.log(e));
  }
}
module.exports = Product;
