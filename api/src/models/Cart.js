const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart",
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
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      isUpdate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    { timestamps: false }
  );
};