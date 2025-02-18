const cors = require('cors');
const express = require('express');
const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.json());
app.use(morgan('tiny'))
app.use(cors());

require('./config/db')
require('dotenv').config()
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../../../uploads")));

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Increase the payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const {authenticateUser}=require('./middleware/isAuthenticated')

const userRouter=require('./routes/user.route')
const adminRouter=require('./routes/admin.route')

const serviceRouter=require('./routes/services.route')
const inquiryRouter=require('./routes/inquiry.route')
const bookingRouter= require('./routes/booking.route')
const testimonialRouter= require('./routes/testimonial.route')
const logoRouter= require('./routes/logo.route')
const blogRouter= require('./routes/blog.route')
const emailRouter= require('./routes/email.route')
const paymentRouter= require('./routes/payment.route')

app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.use('/services', serviceRouter)
app.use('/contactUs',inquiryRouter)
app.use('/booking', bookingRouter)
app.use('/testimonial', testimonialRouter)
app.use('/logo', logoRouter)
app.use('/blog', blogRouter)
app.use('/email', emailRouter)
app.use('/payment', paymentRouter)



module.exports=app