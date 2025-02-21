


const {DataTypes}= require('sequelize')
const sequelize= require('../config/db')
const {v4:uuidv4}= require('uuid')

const bookingModel= sequelize.define("booking",{
    _id: {
        type: DataTypes.STRING, // Use STRING for UUID
        primaryKey: true, // Set as primary key
        defaultValue: () => uuidv4(), // Generate a random UUID
    },

    pickup_location:{
        type:DataTypes.STRING
    },
    drop_location:{
        type:DataTypes.STRING
    },
    start_date:{
        type:DataTypes.STRING
    },
    pickupTime:{
        type:DataTypes.STRING
    },
    dropoffTime:{
        type:DataTypes.STRING
    },
    end_date:{
        type:DataTypes.STRING
    },
    car_id:{
        type:DataTypes.STRING
    },
    car_category:{
        type:DataTypes.ENUM('car','lectric car','van')
    },
    car_model:{
        type:DataTypes.STRING
    },
    car_name:{
        type:DataTypes.STRING
    },
    car_brand:{
        type:DataTypes.STRING
    },
    user_id:{
        type:DataTypes.STRING
    },
    user_email:{
        type:DataTypes.STRING
    },
    user_name:{
        type:DataTypes.STRING
    },
    user_phone:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.FLOAT
    },
    status:{
        type:DataTypes.ENUM("pending","approved","ongoing","completed"),
        defaultValue: "pending"
    }
});
module.exports= bookingModel