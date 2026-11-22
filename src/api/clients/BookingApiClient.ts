
import {
  APIRequestContext,
  APIResponse
} from '@playwright/test';

import { Booking, BookingDates } from '../models/Booking';

import {
  BookingResponse,
  CreatedBookingResponse
} from '../models/BookingResponse';

interface BookingListItem {
  bookingid: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

interface BookingListResponse {
  bookings: BookingListItem[];
}

type BookingWithoutCheckin =
  Omit<Booking, 'bookingdates'> & {
    bookingdates: Pick<BookingDates, 'checkout'>;
  };

export class BookingApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly validateToken: () => Promise<void>,
    private readonly token: string
  ) { }

  private get headers() {
    return {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Cookie': `token=${this.token}`
    };
  }

  async createBooking(
    booking: Booking
  ): Promise<CreatedBookingResponse> {
    await this.validateToken();

    const response = await this.request.post(
      '/api/booking',
      {
        data: booking,
        headers: this.headers
      }
    );

    if (response.status() !== 201) {
      const responseBody = await response.text();

      throw new Error(
        `Booking creation failed. HTTP status: ${response.status()}. Response: ${responseBody}`
      );
    }

    const responseBody =
      (await response.json()) as CreatedBookingResponse;

    if (
      !Number.isInteger(responseBody.bookingid) ||
      responseBody.bookingid <= 0
    ) {
      throw new Error(
        'Booking creation response does not contain a valid booking ID.'
      );
    }

    return responseBody;
  }

  async createBookingWithoutCheckin(
    booking: BookingWithoutCheckin
  ): Promise<APIResponse> {
    await this.validateToken();

    return await this.request.post(
      '/api/booking',
      {
        data: booking,
        headers: this.headers
      }
    );
  }

  async getBookingById(
    bookingId: number
  ): Promise<BookingResponse> {
    await this.validateToken();

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      throw new Error('A valid booking ID is required.');
    }

    const response = await this.request.get(
      `/api/booking/?roomid=${bookingId}`,
      {
        headers: this.headers
      }
    );

    if (!response.ok()) {
      const responseBody = await response.text();

      throw new Error(
        `Booking retrieval failed. HTTP status: ${response.status()}. Response: ${responseBody}`
      );
    }

    return (await response.json()) as BookingResponse;
  }


  async getBookingsByRoomId(
    roomId: number
  ): Promise<BookingListResponse> {
    await this.validateToken();

    if (!Number.isInteger(roomId) || roomId <= 0) {
      throw new Error('A valid room ID is required.');
    }

    const response = await this.request.get(
      '/api/booking',
      {
        params: {
          roomid: roomId
        },
        headers: this.headers
      }
    );

    if (!response.ok()) {
      const responseBody = await response.text();

      throw new Error(
        `Bookings retrieval by room failed. HTTP status: ${response.status()}. Response: ${responseBody}`
      );
    }

    const responseBody =
      (await response.json()) as BookingListResponse;

    if (!Array.isArray(responseBody.bookings)) {
      throw new Error(
        'Booking list response does not contain a valid bookings collection.'
      );
    }

    return responseBody;
  }

}
