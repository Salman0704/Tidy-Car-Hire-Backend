const mongoose=require('mongoose')
const Schema=mongoose.Schema

const inquirySchema=new Schema({
    name:{type:String},
    email:{type:String},
    phone:{type: Number},
    subject:{type:String},
    company:{type:String},
    message:{type:String},
    recognised:{type:Boolean, default:false}
})

const inquiryModel= mongoose.model('inquiry', inquirySchema)

module.exports=inquiryModel;