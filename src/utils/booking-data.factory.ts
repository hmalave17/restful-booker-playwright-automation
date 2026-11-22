import { randomInt, randomUUID } from 'node:crypto';

import { Booking } from '../api/models/Booking';
import { BookingDataSet } from '../data/booking.data';
import { getDateFromToday } from './date.utils';

function generateRandomPhone(): string {
  const length = randomInt(11, 22);

  return Array.from(
    { length },
    () => randomInt(0, 10).toString()
  ).join('');
}

export function createBookingData(
  dataSet: BookingDataSet,
  roomId: number
): Booking {
  if (!Number.isInteger(roomId) || roomId <= 0) {
    throw new Error('A valid room ID is required to create a booking.');
  }

  return {
    roomid: roomId,
    firstname: dataSet.firstname,
    lastname: dataSet.lastname,
    depositpaid: dataSet.depositpaid,
    email: `qa-${randomUUID()}@example.com`,
    phone: generateRandomPhone(),
    bookingdates: {
      checkin: getDateFromToday(7),
      checkout: getDateFromToday(10),
    },
  };
}