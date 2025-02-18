const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const testimonialSchema= new Schema({
    name:{type:String},
    position:{type:String, enum:['Client','Team Member'], default:"Client"},
    image:{type:String},
    description:{type:String}
});

const testimonialModel= mongoose.model('testimonial', testimonialSchema)

module.exports= testimonialModel;