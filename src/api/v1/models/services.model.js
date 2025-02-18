const mongoose= require('mongoose')
const Schema= mongoose.Schema

const serviceSchema= new Schema({
    carName:{type:String, required:true},
    brand:{type:String},
    rating:{type:Number},
    imgUrl:{type:String},
    model:{type:String},
    price:{type:Number},
    speed:{type:String},
    gps:{type:String},
    seatType:{type:String},
    automatic:{type:String},
    description:{type:String},

    // carCategory:{type:String, required:true, enum:["bmw","audi","mercedes","bentley"]},
    carSeats:{type:Number},
    carType:{type:String, enum:["car","electric car","van"], default: "car"},
    
    carStatus:{type:Boolean, default:true}
})

const serviceModel=mongoose.model('service', serviceSchema)

module.exports=serviceModel