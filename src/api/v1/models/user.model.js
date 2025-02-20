



const {DataTypes}= require('sequelize')
const sequelize= require('../config/db')
const {v4:uuidv4}= require('uuid')


const userModel= sequelize.define("users",{
    _id: {
        type: DataTypes.STRING, // Use STRING for UUID
        primaryKey: true, // Set as primary key
        defaultValue: () => uuidv4(), // Generate a random UUID
    },
    userName:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    }

});

module.exports= userModel;