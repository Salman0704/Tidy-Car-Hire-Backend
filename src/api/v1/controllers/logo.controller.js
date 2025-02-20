const {success, badRequest, notFound, serverValidation, onError}= require('../helpers/response_helper')
const {validationResult}= require('express-validator')
const logoModel= require('../models/logos.model')


module.exports={
    getAllLogo: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const logoDetails= await logoModel.findAll()
                logoDetails? success(res,"here are all the logos", logoDetails): notFound(res,"cannot find any logo to show")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }  
    },
    getLogoById: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const id= req.params.id;
                const logoDetails= await logoModel.findByPk(id);
                logoDetails? success(res,"here is the logo you were asking for", logoDetails): notFound(res,'cannot get the required logo')
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }  
    }
}