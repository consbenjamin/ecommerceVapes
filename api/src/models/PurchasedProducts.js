const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "purchasedProducts",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      purchaseDate:{
        type:DataTypes.DATEONLY,
        allownull:false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
    },
    { timestamps: false }
  );
};