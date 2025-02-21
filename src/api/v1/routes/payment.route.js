const express= require('express')
const router= express.Router()

const {createPayment, createSession, payHook}= require('../controllers/payment.controller')

router.post('/createPayment', createPayment)
router.post('/session', createSession)
router.post('/webhook', payHook)

module.exports=router;