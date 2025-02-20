const {DataTypes}= require('sequelize')
const sequelize= require('../config/db')
const {v4: uuidv4}= require('uuid')


const testimonialModel= sequelize.define("testimonial",{
    _id: {
        type: DataTypes.STRING, // Use STRING for UUID
        primaryKey: true, // Set as primary key
        defaultValue: () => uuidv4(), // Generate a random UUID
    },
    name:{
        type: DataTypes.STRING
    },
    position:{
        type:DataTypes.ENUM('Client','Team Member'),
        defaultValue:'Client'
    },
    Image:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    }

});
module.exports= testimonialModel;