const {DataTypes}= require('sequelize')
const sequelize= require('../config/db');
const {v4:uuidv4}= require('uuid')

const inquiryModel= sequelize.define('inquiry',{
    _id: {
        type: DataTypes.STRING, // Use STRING for UUID
        primaryKey: true, // Set as primary key
        defaultValue: () => uuidv4(), // Generate a random UUID
    },
    name:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING
    },
    phoen:{
        type:DataTypes.INTEGER
    },
    subject:{
        type: DataTypes.STRING
    },
    company:{
        type:DataTypes.STRING
    },
    message:{type:DataTypes.STRING

    },
    recognised:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports= inquiryModel;