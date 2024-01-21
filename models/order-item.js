const {DataTypes} = require('sequelize');
const sequelize = require('../util/sql');

const CartItems = sequelize.define('orderItems',{
  id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement:true
},
quantity:{
    type:DataTypes.INTEGER,
    allowNull:false
}
});


module.exports = CartItems;