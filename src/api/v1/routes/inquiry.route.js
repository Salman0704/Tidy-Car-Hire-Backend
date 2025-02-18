const express=require('express')
const router=express.Router()

const { contactUs, newsletter }=require('../controllers/inquiry.controller')



router.post('/', contactUs)
router.post('/newsletter', newsletter)

module.exports=router