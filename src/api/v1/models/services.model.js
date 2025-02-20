const {DataTypes}= require('sequelize')
const sequelize= require('../config/db')
const {v4: uuidv4}= require('uuid');

const serviceModel = sequelize.define(
    "service",
    {
        _id:{
            type:DataTypes.STRING,
            primaryKey:true,
            defaultValue:()=> uuidv4()
        },
      carName: {
        type: DataTypes.STRING,
        allowNull: false, // required field
      },
      brand: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT, // or DataTypes.INTEGER if ratings are whole numbers
      },
      imgUrl: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT, // amount in appropriate currency unit
      },
      speed: {
        type: DataTypes.STRING,
      },
      gps: {
        type: DataTypes.STRING,
      },
      seatType: {
        type: DataTypes.STRING,
      },
      automatic: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      carSeats: {
        type: DataTypes.INTEGER,
      },
      carType: {
        type: DataTypes.ENUM("car", "electric car", "van"),
        defaultValue: "car",
      },
      carStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "service",
      timestamps: false, // Set to true if you want createdAt and updatedAt fields
    }
  );


  module.exports=serviceModel;
