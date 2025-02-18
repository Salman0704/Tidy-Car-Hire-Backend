const {success, badRequest, notFound, serverValidation, onError}= require('../helpers/response_helper')
const {validationResult}= require('express-validator')
const testimonialModel= require('../models/testimonial.model')


module.exports={
    getAlllTestimonial: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const testimonialDetails= await testimonialModel.find()
                testimonialDetails? success(res,"here are all the testimonial list", testimonialDetails): notFound(res,"cannot get any testimonial to show right now")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }   
    },
    getTestimonialByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const id= req.params.id;
                const testimonialDetails= await testimonialModel.findById(id)
                testimonialDetails? success(res,'here is the required testimonial', testimonialDetails): notFound(res,"no such testimonial exist")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }   
    },
    getTestimonialByPosition: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const position= req.body.position;
                const testimonialList= await testimonialModel.find({"position": position})
                testimonialList? success(res,"here are the testimonials by position", testimonialList): notFound(res,"cannot find and data for the required position");
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    }
}