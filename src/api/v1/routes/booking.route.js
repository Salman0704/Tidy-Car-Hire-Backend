const express=require('express')
const router= express.Router();

const {addBooking, getUserBooking, getBookingByID, updateBooking, deleteBooking, getBookingByCarid}= require('../controllers/booking.controller');

router.post('/add', addBooking)
router.post('/all', getUserBooking)
router.get('/:id', getBookingByID)
router.post('/update/:id', updateBooking)
router.get('/delete/:id', deleteBooking)
router.get('/carId/:id', getBookingByCarid)

module.exports=router