const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'user', 
    {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName:{
    type:DataTypes.STRING,
    allownull:false,
  },
  lastName:{
    type:DataTypes.STRING,
    allownull:false,
  },
  email:{
    type:DataTypes.STRING,
    allownull:false,
    unique:true,
  },
  password:{
    type:DataTypes.STRING,
    allownull:false,
  },
  adminPrivileges:{
    type:DataTypes.BOOLEAN,
    allownull:false,
    defaultValue:false
  },
    });
}