'use strict';


// Our table schema
const Clothes = (sequelize, DataTypes) => sequelize.define('clothes', {

  itemType: {
    type: DataTypes.STRING,
    allowNull: false
  },

  itemColor: {
    type: DataTypes.STRING,
  }
});

module.exports = Clothes;