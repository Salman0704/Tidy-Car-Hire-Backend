const bookingModel= require('../models/booking.model')
const serviceModel= require('../models/services.model')


async function updateCarStatus() {
  try {
    // Get current date and previous date
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);

    // Format dates to match MongoDB date format
    const currentDateStr = currentDate.toISOString().split('T')[0];
    const previousDateStr = previousDate.toISOString().split('T')[0];

    // Find bookings where end_date matches current date or previous date
    
    const bookings_end = await bookingModel.find({
      end_date: { $in: [currentDateStr, previousDateStr] },
      status: { $in: ['ongoing'] },
    });
    const booking_start= await bookingModel.find({
      start_date: { $in: [currentDateStr, previousDateStr] },
      status: { $in: ['approved'] },
    })

    // Update carStatus for each matching booking
    for (const booking of bookings_end) {
      await serviceModel.findByIdAndUpdate(booking.car_id, { carStatus: true });
      console.log(`Updated carStatus for car_id: ${booking.car_id}`);
    }

    for (const booking of booking_start){
      await serviceModel.findByIdAndUpdate(booking.car_id,{carStatus:false})
      await bookingModel.findByIdAndUpdate(booking._id,{status:"ongoing"})
    }
  } catch (error) {
    console.error('Error updating carStatus:', error);
  }
}

module.exports = { updateCarStatus };