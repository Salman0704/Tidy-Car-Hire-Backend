const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const logoSchema= new Schema({
    imageUrl:{type:String},
    name:{type:String},
    description:{type:String}

})

const logoModel= mongoose.model('logo', logoSchema);
module.exports= logoModel;