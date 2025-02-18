const mongoose= require('mongoose')
const Schema= mongoose.Schema

const commentSchema = new Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    // For nested replies to comments
    replies: [{
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
});

const blogSchema= new Schema({
    image:{type:String},
    heading:{type:String},
    description:{type:String},
    author:{type:String},
    date:{type:String},
    time:{type:String},
    comments:[commentSchema]
})

const blogModel= mongoose.model('blog', blogSchema)

module.exports= blogModel;