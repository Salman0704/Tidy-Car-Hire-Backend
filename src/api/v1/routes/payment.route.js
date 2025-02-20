const express= require('express')
const router= express.Router()

const {createPayment, createSession}= require('../controllers/payment.controller')

router.post('/createPayment', createPayment)
router.post('/session', createSession)

module.exports=router;