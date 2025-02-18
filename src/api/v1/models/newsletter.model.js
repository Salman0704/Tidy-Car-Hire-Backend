const mongoose=require('mongoose')
const Schema=mongoose.Schema 


const newsLetterSchema= new Schema({
    email:{type:String}
})


const newsLetterModel= mongoose.model('newsletter', newsLetterSchema)

module.exports=newsLetterModel