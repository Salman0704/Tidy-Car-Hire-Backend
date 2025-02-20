const {DataTypes}= require('sequelize')
const sequelize= require('../config/db')
const {v4:uuidv4}= require('uuid')

const newsLetterModel= sequelize.define('newsletter',{
    email:{
        type:DataTypes.STRING
    }
});

module.exports=newsLetterModel