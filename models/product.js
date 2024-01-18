const db = require("../util/sql");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  save() {
    return db.execute("INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)", [this.title, this.price, this.description,this.imageUrl]);
  }
  static delete(id) {}

  static fetchById(id) {
    return db.execute("SELECT * FROM products WHERE  products.id = ?", [id]);
  }
};
