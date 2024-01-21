const { DataTypes} = require('sequelize');
const sequelize = require("../util/sql");

const Product = sequelize.define('products', {
id:{
  type: DataTypes.INTEGER,
  autoIncrement: true,
  allowNull: false,
  primaryKey:true,
},
title:{
  type:DataTypes.STRING,
  allowNull:false
},
description:{
  type:DataTypes.STRING,
  allowNull:false
},
price:{
  type:DataTypes.DOUBLE,
  allowNull:false
},
imageUrl:{
  type:DataTypes.STRING,
  allowNull:false
}
});

module.exports= Product;
