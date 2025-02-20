const {success, badRequest, onError, serverValidation, notFound}=require('../helpers/response_helper')
const bcrypt=require('bcrypt')


const {validationResult}= require('express-validator')
const inquiryModel= require('../models/inquiry.model')
const newsLetterModel= require('../models/newsletter.model')


module.exports={
    contactUs: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                
                let data= req.body;

                
                await inquiryModel.sync()
                // const inquiryData= new inquiryModel(data)
                const inquiryDetails= await inquiryModel.create(data)
                inquiryDetails? success(res,"inquiry submitted","Your inquiry has been submitted we will get back to you with an update"): badRequest(res,"cannot post the inquiry right now")

            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },

    newsletter: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                let email=req.body.email;
                await newsLetterModel.sync()
                // const newsLetterData= new newsLetterModel({email})
                const newsLetterDetails= await newsLetterModel.create({email})
                newsLetterDetails ? success(res,'email submitted successfully', "Thanks for subscribing to our newsletter"): notFound(res,'sorry for your inconvinence')
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    }
}