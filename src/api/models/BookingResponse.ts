import { BookingDates } from './Booking';

export interface BookingResponse {
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email?: string;
  phone?: string;
  bookingdates: BookingDates;
}

export interface BookingListItem {
  bookingid: number;
  booking: BookingResponse;
}

export interface BookingListResponse {
  bookings: BookingListItem[];
}

export interface CreatedBookingResponse {
  bookingid: number;
}