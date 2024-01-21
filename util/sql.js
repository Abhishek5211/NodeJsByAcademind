const Sequealize = require('sequelize');

const sequelize = new Sequealize('node_project','root','Giyuu-Tomioka1', {dialect:'mysql', host: 'localhost'});

module.exports = sequelize;