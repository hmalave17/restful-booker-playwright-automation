import { bookingTestData } from '../src/data/booking.data';
import { createBookingData } from '../src/utils/booking-data.factory';

const generatedBookings = bookingTestData.map((dataSet) =>
  createBookingData(dataSet)
);

generatedBookings.forEach((booking, index) => {
  const dataSet = bookingTestData[index];

  if (!dataSet) {
    throw new Error(`Dataset not found at index ${index}`);
  }

  if (!booking.email || !booking.email.includes('@')) {
    throw new Error('Invalid email generated.');
  }

  if (!booking.phone || booking.phone.length < 11 || booking.phone.length > 21) {
    throw new Error('Phone length must be between 11 and 21 characters.');
  }

  if (!/^\d+$/.test(booking.phone)) {
    throw new Error('Phone must contain only numeric characters.');
  }

  if (booking.bookingdates.checkin >= booking.bookingdates.checkout) {
    throw new Error('Checkout must be later than checkin.');
  }

  if (
    booking.firstname !== dataSet.firstname ||
    booking.lastname !== dataSet.lastname ||
    booking.roomid !== dataSet.roomid ||
    booking.depositpaid !== dataSet.depositpaid
  ) {
    throw new Error('Generated booking does not preserve dataset values.');
  }

  console.log(`Dataset ${index + 1}: VALID`);
  console.log(JSON.stringify(booking, null, 2));
});

const emails = generatedBookings.map((booking) => booking.email);

if (new Set(emails).size !== emails.length) {
  throw new Error('Generated emails must be unique.');
}

console.log('\nAll booking data validations passed.');
