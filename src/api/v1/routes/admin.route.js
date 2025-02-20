const express=require('express')
const router=express.Router()
const upload= require('../middleware/upload')

const {register,getAdmin,editAdmin,login, getUser, getAllInquiry, getUnresolvedInquiry, editInquiryByID, deleteInquiryByID, addCar, getNewsLetter, getAllBooking, getUserBooking, getBookingByID, updateBookingStatus, deleteBooking, addTestimonial, deleteTestimonial, getAllTestimonial, addLogo, getAllLogo, deleteLogo, getLogoById, addBlog, getAllBlog, getBlogByID, editCar, allCar, deleteCar}=require('../controllers/admin.controller')


const {authenticateAdmin}=require('../middleware/isAuthenticated')

router.post('/register',register)
router.post('/login',login)
router.get('/',authenticateAdmin,getAdmin)
router.post('/edit',authenticateAdmin,editAdmin)

// user
router.get('/all/users',authenticateAdmin,getUser)

// cars
router.post('/car/add',authenticateAdmin, upload.single("imgUrl"),addCar)
router.post('/car/edit/:id', authenticateAdmin, upload.single("imgUrl"),editCar)
router.get('/car/all', authenticateAdmin, allCar)
router.get('/car/delete/:id', authenticateAdmin, deleteCar)

// inquiry
router.get('/inquiry/all', authenticateAdmin, getAllInquiry)
router.get('/inquiry/unresolved', authenticateAdmin, getUnresolvedInquiry)
router.post('/inquiry/edit/:id', authenticateAdmin, editInquiryByID)
router.get('/inquiry/delete/:id', authenticateAdmin, deleteInquiryByID)

// newsletter
router.get('/newsletter', authenticateAdmin, getNewsLetter)

// bookings
router.get('/booking/all',authenticateAdmin,getAllBooking)
router.post('/booking/user', authenticateAdmin, getUserBooking)
router.get('/booking/:id', authenticateAdmin, getBookingByID)
router.post('/booking/update/:id', authenticateAdmin, updateBookingStatus)
router.get('/booking/delete/:id', authenticateAdmin, deleteBooking)



// testimonials
router.post('/testimonial/add',authenticateAdmin, addTestimonial)
router.get('/testimonial/delete/:id', authenticateAdmin, deleteTestimonial)
router.get('/testimonial/all', authenticateAdmin,getAllTestimonial)



// logo
router.post('/logo/add', authenticateAdmin, addLogo)
router.get('/logo/all', authenticateAdmin, getAllLogo)
router.get('/logo/delete/:id', authenticateAdmin, deleteLogo)
router.get('/logo/id/:id', authenticateAdmin, getLogoById)

// blog
router.post('/blog/add', authenticateAdmin,addBlog)
router.get('/blog/all', authenticateAdmin, getAllBlog)
router.get('/blog/id/:id', authenticateAdmin, getBlogByID)

module.exports=router


