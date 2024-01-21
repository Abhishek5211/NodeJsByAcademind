const {DataTypes} = require('sequelize');
const sequelize = require('../util/sql');

const Order = sequelize.define('orders',{
  id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement:true
}
});

module.exports = Order;