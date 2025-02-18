const {success,badRequest,onError,serverValidation, notFound}=require('../helpers/response_helper')


const {validationResult}=require('express-validator')
const nodemailer= require("nodemailer")


module.exports={
    sendEmail: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been occured","errors":errors.array()})
            }else{
                const data = req.body;

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    
                    auth: {
                    user: "salmanalisayyed7190@gmail.com",
                    pass: "egww baln kuzv rhne",
                    },
                });
                // console.log(typeof(data))
                
                let mailOptions = {
                    from: "salmanalisayyed7190@gmail.com",
                    to: "salmanalisayyed0704@gmail.com",
                    subject: "New Booking Confirmation",
                    text: `Booking Details:
                    ${JSON.stringify(data)}`,
                };

                const emailDetails= await transporter.sendMail(mailOptions);
                emailDetails? success(res,"Email sent successfully", emailDetails): notFound(res,"error sending email")

            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
}
