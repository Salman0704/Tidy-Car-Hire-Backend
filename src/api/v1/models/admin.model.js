const mongoose=require('mongoose')
const Schema=mongoose.Schema

const adminSchema=new Schema({
    fullName:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String},
    phone:{type:String},
    gender:{type:String, enum:["male","female"], default:"male"},
    photo:{type:String},
    
})

const adminModel=mongoose.model('admin',adminSchema)

module.exports=adminModel