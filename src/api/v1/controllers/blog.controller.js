const {success, badRequest, notFound, serverValidation, onError}= require('../helpers/response_helper')
const {validationResult}= require('express-validator')
const blogModel=require('../models/blog.model')



module.exports={
    getAllBlog: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const blogList= await blogModel.find()
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
                const blogData= await blogModel.findById(id)
                blogData? success(res,"here is the desired blog", blogData): notFound(res,"cannot fetch the desired blog")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    addComment: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const id= req.params.id;
                const data= req.body;
                // const blogData= await blogModel.findByIdAndUpdate(id,{comments:data})
                const blogData= await blogModel.findByIdAndUpdate(id,{$push:{comments:data}}, {new:true})
                blogData? success(res,"comment has been added successfully", blogData): notFound(res,"comment cannot be added at this time")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    }
}