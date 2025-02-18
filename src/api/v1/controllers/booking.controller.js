const {success, badRequest, onError, serverValidation, notFound}= require('../helpers/response_helper')

const bcrypt=require('bcrypt')

const {validationResult}= require('express-validator')
const bookingModel= require('../models/booking.model')


module.exports={
    addBooking: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been occured","errors":errors.array()})
            }else{
                let data= req.body;
                // { ...json1, ...json2 };
                // data= { ... data, ...{"user_id":req.param.user_id}}
                console.log('hi')
                const bookingData= new bookingModel(data)
                const bookingDetails= await bookingData.save()

                bookingDetails? success(res,"booking has been added successfully", bookingDetails) : notFound(res,"sorry cannot process the booking right now")

            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }    
    },

    getUserBooking: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been occured","errors":errors.array()})
            }else{
                const user_email= req.body.email;

                const booking= await bookingModel.find({"user_email":user_email})
                booking? success(res,"here are all the bookings by user", booking): notFound(res,"sorry to inform you that no booking for the customers had found")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        } 
    },

    getBookingByID: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been occured","errors":errors.array()})
            }else{
                // const user_id= req.params.user_id;
                const booking_id= req.params.id;

                const booking=await bookingModel.findById(booking_id)
                booking? success(res,'here is the booking you looking for', booking): notFound(res,"does not exists");
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    updateBooking: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const booking_id= req.params.id;
                const data= req.body;
                const bookingDetails= await bookingModel.findByIdAndUpdate(booking_id,data,{new:true})
                bookingDetails? success(res,"booking has been updated successfully",bookingDetails): notFound(res,"cannot update the booking right now")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    deleteBooking: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const booking_id= req.params.id;
                const bookiungDetails= await bookingModel.findByIdAndDelete(booking_id);
                bookiungDetails? success(res,"booking has been deleted successfully", bookiungDetails): notFound(res,'cannot delete the booking right now')
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getBookingByCarid: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been occured","errors":errors.array()})
            }else{
                const carId= req.params.id;
                const bookingList= await bookingModel.find({car_id: carId, status: "approved" });
                bookingList.length>0? success(res,"here are the list of booking for the car", bookingList): notFound(res,"carid not found in the list")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        } 
    },



}