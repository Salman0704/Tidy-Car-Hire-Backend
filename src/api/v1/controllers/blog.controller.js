const {success, badRequest, notFound, serverValidation, onError}= require('../helpers/response_helper')
const {validationResult}= require('express-validator')
const {blogModel, Comment}=require('../models/blog.model')



module.exports={
    getAllBlog: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const blogList= await blogModel.findAll()
                blogList? success(res,"here are all the blogs", blogList): notFound(res,"cannot fetch any blog to show")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    getBlogByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const id= req.params.id;
                // const blogData= await blogModel.findByPk(id)
                const blogData = await blogModel.findByPk(id, {
              include: [{
                model: Comment,
                // as: 'comments' // Use the alias defined in your association (if any)
              }]
            });
                blogData? success(res,"here is the desired blog", blogData): notFound(res,"cannot fetch the desired blog")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    addComment: async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return serverValidation(res, {
              message: "Server error has occurred",
              errors: errors.array()
            });
          } else {
            // Get the blog id from request params and comment data from body
            const blogId = req.params.id;
            console.log(blogId)
            const data = req.body;
            const combinedJson = { ...{BlogId:blogId}, ...data };
            // For example, assume req.body.comment contains the comment text.
            await Comment.sync()
            
            // Insert the comment into the Comments table
            const newComment = await Comment.create(combinedJson);
      
            // Retrieve the updated blog with its comments included
            const blogData = await blogModel.findByPk(blogId, {
              include: [{
                model: Comment,
                // as: 'comments' // Use the alias defined in your association (if any)
              }]
            });
      
            if (blogData) {
              success(res, "Comment has been added successfully", blogData);
            } else {
              notFound(res, "Comment cannot be added at this time");
            }
          }
        } catch (error) {
          console.log(error);
          onError(res, 'API has failed');
        }
      }
}