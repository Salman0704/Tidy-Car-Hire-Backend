const {success, badRequest, notFound,serverValidation, onError}= require('../helpers/response_helper')
const {validationResult}= require('express-validator')
const secretKey= process.env.STRIPE_SECRET_KEY;


const stripe= require('stripe')(secretKey)


module.exports={
    createPayment: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const data= req.body;
                const paymentIntent= await stripe.paymentIntents.create({
                    amount: data.amount*100,
                    currency:"gbp",
                    metadata:{
                        car_id: data.car_id,
                        booking_id: data.booking_id
                    }
                });
                if(paymentIntent){
                    success(res,"payment successful", paymentIntent)
                }else{
                    notFound(res,"parment processing failed")
                }
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    }
}