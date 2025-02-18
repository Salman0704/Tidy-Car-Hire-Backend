const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema= new Schema({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String},
    phone:{type:String},
})

const userModel=mongoose.model('users',userSchema)


module.exports=userModel