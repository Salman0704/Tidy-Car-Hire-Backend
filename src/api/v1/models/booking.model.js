const mongoose= require('mongoose')
const Schema= mongoose.Schema

const bookingSchema= new Schema({
    pickup_location:{type:String},
    drop_location:{type:String},
    start_date:{type:String},
    end_date:{type:String},
    car_id:{type:String},
    car_category:{type:String, enum:['car','electric car','van']},
    car_model:{type:String},
    car_name:{type:String},
    car_brand:{type:String},
    user_id:{type:String},
    user_email:{type:String, require: true},
    user_name:{type:String},
    user_phone:{type:String},
    price:{type:Number},
    status:{type:String, enum:["pending","approved","ongoing","completed"], default:"pending"}

})

const bookingModel= mongoose.model('booking', bookingSchema );

module.exports= bookingModel;