const {DataTypes}= require('sequelize');
const sequelize= require('../config/db')
const {v4:uuidv4}= require('uuid')


const logoModel= sequelize.define("logo",{
    _id:{
        type:DataTypes.STRING,
        primaryKey:true,
        defaultValue:()=> uuidv4()
    },
    imageUrl:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    }
});

module.exports= logoModel