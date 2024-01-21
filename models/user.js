 const {DataTypes}  = require('sequelize');
 const sequalize = require('../util/sql');

 const User = sequalize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
    }
 });

 module.exports = User;