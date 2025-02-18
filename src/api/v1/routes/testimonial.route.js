const express= require('express')
const router= express.Router()

const {getAlllTestimonial,getTestimonialByID, getTestimonialByPosition}= require('../controllers/testimonial.comtroller')


router.get('/all',getAlllTestimonial);
router.get('/id/:id', getTestimonialByID)
router.post('/position', getTestimonialByPosition)

module.exports= router;