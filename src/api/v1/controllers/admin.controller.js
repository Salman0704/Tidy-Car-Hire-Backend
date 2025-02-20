const {success,badRequest,notFound,serverValidation,onError}=require('../helpers/response_helper')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')
const fs = require("fs");
const adminModel=require('../models/admin.model')
const userModel=require('../models/user.model')
// const petModel=require('../models/pet.model')
const inquiryModel= require('../models/inquiry.model')
const serviceModel=require('../models/services.model')

const newsletterModel=require('../models/newsletter.model')
const bookingModel= require('../models/booking.model')

const testimonialModel=require('../models/testimonial.model')

const logoModel= require('../models/logos.model')

const {blogModel, Comment}= require('../models/blog.model')



const { adminToken, parseJwt } = require('../middleware/isAuthenticated')


module.exports={
    register:async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const data= req.body;
                const salt=await bcrypt.genSalt(10)
                let encryptedPassword=await bcrypt.hash(data.password,salt)
                data.password=encryptedPassword
                // const adminData=new adminModel(data)
                await adminModel.sync();
                const adminDetails=await adminModel.create(data)
                // adminDetails? success(res,'admin is being registered successfully',adminDetails) : notFound(res,'admin cannot be registered right now')
                if(adminDetails){
                    const token=adminToken(adminDetails)
                    success(res,'admin is being registered successfully',{adminDetails,token})
                }else{
                    badRequest(res,'user cannot be registered right now')
                }
                
                

            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    login:async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"servver error has occured","errors":errors.array()})
            }else{
                const data={
                    email:req.body.email,
                    password:req.body.password
                }
                const adminDetails=await adminModel.findOne({email:data.email})
                if(adminDetails){
                    const passwordMatch=bcrypt.compare(data.password,adminDetails.password)
                    const token=adminToken(adminDetails)
                    passwordMatch?success(res,'admin login is successful',{adminDetails,token}): notFound(res,'admin credentials does not match')
                    
                }else{
                    notFound(res,'admin credentials does not match')
                }

            }

        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level',error)
        }
    },
    getAdmin:async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"server error has occured","errors":errors.array()})
            }else{
                const adminDetails=await adminModel.findAll()
                adminDetails.length>0 ? success(res,'heres the admin Details',adminDetails[0]): notFound(res,'cannot find admin Details')
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level',error)
        }
    },
    editAdmin:async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"server validation error occured","errors":errors.array()})
            }else{
                const token=req.headers.authorization
                const tokenData=parseJwt(token)

                const adminId=tokenData.user_id
                let data=req.body
                if(data.password){
                    const salt=await bcrypt.genSalt(10)
                    data.password=await bcrypt.hash(data.password,salt)
                }
                const updatedAdmin=await adminModel.findByPk(adminId)
                if(updatedAdmin){
                    await updatedAdmin.update(data)
                }
                
                updatedAdmin? success(res,'admin has been updated successfully',updatedAdmin):badRequest(res,'admin details cannot be updated due to some reasons')
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level',error)
        }
    },
    getUser:async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{message:"server validation error has just occured",error:errors.array()})
            }else{
                const users=await userModel.findAll()
                users.length>0 ? success(res,'here is the list of users',users):notFound(res,'no user found to show')
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level',error)
        }
    },
    getAllInquiry: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const inquiryList= await inquiryModel.findAll()
                inquiryList? success(res,"here is the list of inquiry", inquiryList): notFound(res,"we do not have any data to show")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    getUnresolvedInquiry: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const inquiryList= await inquiryModel.findAll({"recognised":false})
                inquiryList? success(res,"here are unresolved inquiries", inquiryList): notFound(res,"we don't have any inquiry to show you")

            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        } 
    },
    editInquiryByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const id= req.params.id;
                const data=req.body;
                const inquiryData= await inquiryModel.findByPkAndUpdate(id, data,{new:true});
                inquiryData? success(res,'inquiry data has been updated successfully', inquiryData): notFound(res,'cannot findd the inquiry to update')

            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }   
    },
    deleteInquiryByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const id= req.params.id;
                const inquiryData= await inquiryModel.findByPkAndDelete(id)
                inquiryData? success(res,'inquiry deleted successfully', inquiryData): notFound(res,'inquiry data cannot be deleted')
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    addCar:async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const imagePath = req.file.path;
                console.log("H11")
                console.log(imagePath)
                const imageBuffer = fs.readFileSync(imagePath);
                console.log("H222")
                console.log(imageBuffer)
                const base64Image = imageBuffer.toString("base64");
                console.log("H333")
                // console.log(base64Image)
                // console.log("hi")
                // let data= req.body;
                let data= {
                    carName: req.body.carName,
                    brand: req.body.brand,
                    rating: req.body.rating,
                    imgUrl: imagePath,
                    model: req.body.model,
                    price:req.body.price,
                    speed:req.body.speed,
                    gps: req.body.gps,
                    seatType: req.body.seatType,
                    automatic: req.body.automatic,
                    description: req.body.description,
                    carSeats: req.body.carSeats,
                    carType: req.body.carType,

                }
                await serviceModel.sync();

                // const carData=new serviceModel(data)
                const carDetails=await serviceModel.create(data)
                if(carDetails){
                    success(res,"car details has been added successfully", carDetails)
                }else{
                    badRequest(res,"cannot add car right now")
                }
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
        
    },
    editCar:async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id= req.params.id;
                const data= req.body;
                // const carDetails= await serviceModel.findByPkAndUpdate(id, data, {new:true})
                const carDetails= await serviceModel.findByPk(id)
                if(carDetails){
                    await carDetails.update(data)
                }
                carDetails? success(res,"car has been updated successfully", carDetails): notFound(res,"right now the modification is not possible")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    allCar:async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const carList= await serviceModel.findAll()
                // console.log(carList)
                if(carList.length>0){
                    const updatedCarList = carList.map((car) => ({
                        ...car.get({ plain: true }),
                        imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                        // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                          
                      }));
                      console.log(updatedCarList)    
                
                      success(res, "Here are the available cars", updatedCarList);
                }else{
                    notFound(res,"sorry we do not have any cars to show right now")
                }
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    deleteCar: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id= req.params.id;
                // const carDetails= await serviceModel.findByIdAndDelete(id)
                const carDetails= await serviceModel.findByPk(id);
                if(carDetails){
                    await carDetails.destroy()
                }
                carDetails? success(res,"car deleted successfully", carDetails): notFound(res,"car cannot be deleted right now")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },

    getNewsLetter: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const emailList= await newsletterModel.findAll()
                emailList ? success(res,'here are all the emails',emailList): notFound(res,"did not found any emails to display")
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },

    getAllBooking: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{

                const bookingList= await bookingModel.findAll();
                bookingList? success(res, "here are all the bookings", bookingList): notFound(res,'cannot find any booking')
                
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    
    getUserBooking: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const user_email= req.body.user_email;
                const bookingList= await bookingModel.findAll({"user_email":user_email})
                bookingList? success(res,"here aare the customer bookings", bookingList): notFound(res,"we cannot find any booking for the customer")

            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getBookingByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const booking_id= req.params.id;
                const bookingDetails= await bookingModel.findByPk(booking_id);
                bookingDetails? success(res,"here is the booking", bookingDetails): notFound(res,"cannot find the booking to show")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    updateBookingStatus: async(req, res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{

                const booking_id= req.params.id;
                const status= req.body.status;
                // const bookingDetails= await bookingModel.findByIdAndUpdate(booking_id,{"status":status},{new: true})
                const bookingDetails= await bookingModel.findByPk(booking_id)
                if(bookingDetails){
                    await bookingModel.update({status: status})
                    
                }
                bookingDetails? success(res,"status has been updated successfully", bookingDetails): notFound(res,"cannot update the booking right now")
                
                // bookingDetails? success(res,"here is the updated booking details", bookingDetails): notFound(res,"cannot update the booking right now")
                // if(bookingDetails && bookingDetails.status=="ongoing"){
                //     console.log('hi')
                //     const carDetails= await serviceModel.findByIdAndUpdate(bookingDetails.car_id,{carStatus:false},{new:true})
                //     carDetails? success(res,"here is the updated booking details", bookingDetails):notFound(res,"cannot update car stauts")
                // }if (bookingDetails && bookingDetails.status=="completed") {
                //     const carDetails= await serviceModel.findByIdAndUpdate(bookingDetails.car_id,{carStatus:true},{new:true})
                //     carDetails? success(res,"here is the updated booking details", bookingDetails):notFound(res,"cannot update car stauts")
                // }if(bookingDetails && (bookingDetails.status=="approved"|| bookingDetails.status=="pending")) {
                //     success(res,"here is the updated booking", bookingDetails)
                // }if(!bookingDetails){
                //     notFound(res,"cannot update the booking right now")
                // }
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    
    deleteBooking: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{ 
                const booking_id=req.params.id;
                const bookingData= await bookingModel.findByPk(booking_id);
                if(bookingData){
                    await bookingData.destroy()
                }
                bookingData? success(res,"booking has been deleted", bookingData): notFound(res,"booking cannot be deleted");

            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    addTestimonial: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const data= req.body;
                await testimonialModel.sync();
                const testimonialDetails=await testimonialModel.create(data)

                testimonialDetails? success(res,"testimonial has been added successfully", testimonialDetails): notFound(res,"cannot add testimonial at this moment")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    deleteTestimonial: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id= req.params.id;
                const testimonialDetails= await testimonialModel.findByPk(id)
                if(testimonialDetails){
                    await testimonialDetails.destroy()
                }
                testimonialDetails? success(res,"testimonial has been deleted successfully", testimonialDetails): notFound(res,'cannot delete the testimonial which does not exists');
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        } 
    },
    getAllTestimonial: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const testimonialDetails= await testimonialModel.findAll();
                testimonialDetails? success(res,"here are all the testimonials so far", testimonialDetails): notFound(res,"cannot get any testimonial to show")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    addLogo: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{  
                const data= req.body;
                await logoModel.sync();
                const logoDetails= await logoModel.create(data);
                logoDetails? success(res,'logo has been added successfully', logoDetails): notFound(res, "cannnot add logo right now don't know why")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getAllLogo: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{  
                const logoDetails= await logoModel.findAll()
                logoDetails? success(res,"here are all the logos", logoDetails): notFound(res,"there are no logos in the database to show")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    deleteLogo: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id= req.params.id;
                const logoDetails = await logoModel.findByPk(id); // Find the record by primary key
                if (logoDetails) {
                    await logoDetails.destroy(); // Delete the record
                }
                logoDetails? success(res,'logo has been deleted successfully', logoDetails): notFound(res,'logo cannot be deleted right now')
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getLogoById: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id= req.params.id;
                const logoItem= await logoModel.findByPk(id)
                logoItem? success(res,"here is the desired logo", logoItem): notFound(res,"cannot find the desired logo")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },

    addBlog: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const data= req.body;
                // const blogData= new blogModel(data);
                await blogModel.sync()
                const blogDetails= await blogModel.create(data)
                blogDetails? success(res,"blog has been added successfully", blogDetails): notFound(res,"blog cannot be added right now")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getAllBlog: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const blogList= await blogModel.findAll()
                blogList? success(res,"here are the list of blogs", blogList): notFound(res,"cannot fetch the blogs right now")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },

    getBlogByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id= req.params.id;
                const blogData= await blogModel.findByPk(id);
                blogData? success(res,"here is the blog you were looking for", blogData): notFound(res,"cannot fetch the desired blog")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    }


}