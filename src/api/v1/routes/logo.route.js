const express= require('express')
const router=express.Router()

const {getAllLogo,getLogoById}= require('../controllers/logo.controller')

router.get('/all', getAllLogo)
router.get('/id/:id', getLogoById)


module.exports= router;
