const {success, badRequest, notFound,serverValidation, onError}= require('../helpers/response_helper')
const {validationResult}= require('express-validator')
const secretKey= process.env.STRIPE_SECRET_KEY;
const bookingModel= require('../models/booking.model')

const stripe= require('stripe')(secretKey)


module.exports={
    createPayment: async(req,res)=>{
        try{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
            serverValidation(res,{"message":"server error has occured","errors":errors.array()})  
            }else{
                const data= req.body;
                const paymentIntent= await stripe.paymentIntents.create({
                    amount: data.amount*100,
                    currency:"gbp",
                    metadata:{
                        car_id: data.car_id,
                        booking_id: data.booking_id
                    }
                });
                if(paymentIntent){
                    success(res,"payment successful", paymentIntent)
                }else{
                    notFound(res,"parment processing failed")
                }
            }
        }catch(error){
            console.log(error)
            onError(res,'api has failed')
        }
    },
    createSession: async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return serverValidation(res, {
              message: "Server error has occurred",
              errors: errors.array(),
            });
          } else { 
            const data = req.body;
            
            // Create line_items as an array with one item
            const line_items = [
              {
                price_data: {
                  currency: "gbp",
                  product_data: {
                    name: "Car Booking", // A default product name (update as needed)
                    metadata: {
                      car_id: data.car_id,
                      booking_id: data._id, // Assuming data._id is the booking ID
                    },
                  },
                  unit_amount: data.price * 100, // Stripe expects amount in pence (if currency is GBP)
                },
                quantity: 1,
              }
            ];
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              line_items: line_items,
              mode: "payment",
              success_url: "http://localhost:3000/payment/success",
              cancel_url: "http://localhost:3000/payment/cancel",
            });
              if(session.id){
                success(res, "Payment successful", { id: session.id })
                // const bookingData= await bookingModel.findByPk(data._id)
                // if(bookingData){
                //     await bookingData.update({status:"approved"})
                //     success(res, "Payment successful", { id: session.id })
                // }else{
                //     console.log("booking data not updated")
                //     success(res, "Payment successful", { id: session.id })
                // }
                
              }else{
                notFound(res, "Payment cannot be processed at this time");
              }
          }
        } catch (error) {
          console.log(error);
          onError(res, "API has failed");
        }
      },


      payHook: async(req,res)=>{
        const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const bookingData = await bookingModel.findByPk(session.metadata.booking_id);
    if (bookingData) {
      await bookingData.update({ status: 'approved' });
      console.log(`Booking ${bookingData.id} updated to 'approved'`);
    } else {
      console.error('Booking not found');
    }
  }

  res.json({ received: true });
      }
      
}