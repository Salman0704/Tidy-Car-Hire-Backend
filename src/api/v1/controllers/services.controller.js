const {success,badRequest,onError,serverValidation, notFound}=require('../helpers/response_helper')
const bcrypt=require('bcrypt')


const {validationResult}=require('express-validator')
// const{}=require('express-validator')
const serviceModel=require('../models/services.model')

module.exports={
    
    getAllCar:async(req,res)=>{
        try{
                    const errors=validationResult(req)
                    if(!errors.isEmpty()){
                        serverValidation(res,{"message":"error has been occured","errors":errors.array()})
                    }else{
                        const carList=await serviceModel.findAll()
                        if(carList.length>0){
                            const updatedCarList = carList.map((car) => ({
                                ...car.get({plain:true}),
                                imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                                // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                                  
                              }));
                            //   console.log(updatedCarList)    
                        
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

    getCarByCategory: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                let carCategory=req.params.Category;
                const carList=await serviceModel.find({"carCategory":carCategory,"carStatus": true})
                if(carList.length>0){
                    const updatedCarList = carList.map((car) => ({
                        ...car.get({plain:true}),
                        imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                        // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                          
                      }));
                    //   console.log(updatedCarList)    
                
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

    getCarByID: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const id=req.params.id;
                let carList=await serviceModel.findOne({_id:id});
                // console.log(carList)

                // if (carList && typeof carList === "object") {
                //     carList = [carList]; // Convert to an array
                //   }
                if(carList){
                    carList.imgUrl= `${req.protocol}://${req.get("host")}/${carList.imgUrl}`
                    // const updatedCarList = carList.map((car) => ({
                    //     ...car._doc,
                    //     imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                    //     // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                          
                    //   }));
                    //   console.log(updatedCarList)    
                
                      success(res, "Here are the available cars", carList);
                }else{
                    notFound(res,"sorry we do not have any cars to show right now")
                }

            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getCarByStatus: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const carList= await serviceModel.findAll({"carStatus":true})
                if(carList.length>0){
                    const updatedCarList = carList.map((car) => ({
                        ...car.get({plain:true}),
                        imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                        // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                          
                      }));
                    //   console.log(updatedCarList)    
                
                      success(res, "Here are the available cars", updatedCarList);
                }else{
                    notFound(res,"sorry we do not have any cars to show right now")
                }
                // carList? success(res,"here are the available cars",carList): notFound(res,"sorry we don't have any available cars right now")
            }
            
        }catch(error){
            console.log(error)
            onError(res,'api has failed at some level', error)
        }
    },
    getCarByType: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                const carType=req.body.type || "car";

                const carList= await serviceModel.findAll({"carType": carType});
                if(carList.length>0){
                    const updatedCarList = carList.map((car) => ({
                        ...car.get({plain:true}),
                        imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                        // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                          
                      }));
                    //   console.log(updatedCarList)    
                
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
    getDemandedCar: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                serverValidation(res,{"message":"error has been ocured", "error": errors.array()})
            }else{
                console.log("welcome back")
                const data= req.body;
                const carList= await serviceModel.findAll({'carType': data.vehicleType})
                if(carList.length>0){
                    const updatedCarList = carList.map((car) => ({
                        ...car.get({plain:true}),
                        imgUrl:car.imgUrl?`${req.protocol}://${req.get("host")}/${car.imgUrl}`:null
                        // imgUrl: car.imgUrl? `${req.protocol}://${req.get("host")}/${car.imgUrl}`
                          
                      }));
                    //   console.log(updatedCarList)    
                
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
   
}