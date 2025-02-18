const express=require('express')
const router= express.Router()

const {getAllCar, getCarByCategory, getCarByID, getCarByStatus, getCarByType, getDemandedCar}=require('../controllers/services.controller')


router.get('/getAllCar',getAllCar)
router.get('/getCarByCategory/:Category', getCarByCategory)
router.get('/car/:id', getCarByID)
router.get('/getCarByStatus', getCarByStatus)
router.get('/type', getCarByType)
router.post('/demand', getDemandedCar)



module.exports=router;