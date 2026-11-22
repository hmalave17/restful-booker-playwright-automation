import { Booking } from '../api/models/Booking';

export interface BookingTestData {
  description: string;
  booking: Booking;
}

export const bookingTestData: BookingTestData[] = [
  {
    description: 'Standard booking - paid deposit',
    booking: {
      roomid: 1,
      firstname: 'Joseph',
      lastname: 'Brown',
      depositpaid: true,
      bookingdates: {
        checkin: '2027-01-15',
        checkout: '2027-01-18',
      },
    },
  },
  {
    description: 'Standard booking - unpaid deposit',
    booking: {
      roomid: 2,
      firstname: 'Maria',
      lastname: 'Garcia',
      depositpaid: false,
      bookingdates: {
        checkin: '2027-02-10',
        checkout: '2027-02-13',
      },
    },
  },
];