
import { randomUUID } from 'node:crypto';

import { test, expect } from '../../src/fixtures/api.fixture';

import { bookingTestData } from '../../src/data/booking.data';
import { createBookingData } from '../../src/utils/booking-data.factory';
import { createRoomData } from '../../src/data/room.data';

test.describe('Booking API - Negative Scenarios', () => {
  for (const dataSet of bookingTestData) {
    test(`Reject booking without check-in date - ${dataSet.description}`, async ({
      roomApi,
      bookingApi
    }) => {
      // Arrange: Generate a unique identifier for this test.
      const descriptionIdentifier = `ROOM-NEGATIVE-${randomUUID()}`;

      const roomData = createRoomData(descriptionIdentifier);

      // Act: Create the room.
      await test.step('Create room', async () => {
        const response = await roomApi.createRoom(roomData);

        expect(response.success).toBe(true);
      });

      // Act: Retrieve the created room.
      const room = await test.step(
        'Retrieve created room',
        async () => {
          const createdRoom = await roomApi.getRoomByDescription(
            descriptionIdentifier
          );

          expect(createdRoom.description).toContain(
            descriptionIdentifier
          );

          expect(createdRoom.roomid).toBeGreaterThan(0);

          return createdRoom;
        }
      );

      // Arrange: Generate valid booking data.
      const booking = createBookingData(dataSet, room.roomid);

      // Arrange: Remove the mandatory check-in date.
      const invalidBooking = {
        ...booking,
        bookingdates: {
          checkout: booking.bookingdates.checkout
        }
      };

      // Act: Attempt to create a booking without check-in.
      const response = await test.step(
        'Submit booking without check-in date',
        async () => {
          return await bookingApi.createBookingWithoutCheckin(
            invalidBooking
          );
        }
      );

      // Assert: Validate that the API rejects the request.
      await test.step('Validate booking rejection', async () => {
        expect(response.status()).toBeGreaterThanOrEqual(400);
      });

      // Act: Retrieve bookings associated with the room.
      const roomBookings = await test.step(
        'Retrieve bookings by room ID',
        async () => {
          return await bookingApi.getBookingsByRoomId(room.roomid);
        }
      );

      // Assert: Validate that the invalid booking was not persisted.
      await test.step(
        'Validate booking was not persisted',
        async () => {
          expect(roomBookings.bookings).toHaveLength(0);
        }
      );
    });
  }
});
