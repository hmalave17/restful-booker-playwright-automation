import { randomUUID } from 'node:crypto';

import { test, expect } from '../../src/fixtures/api.fixture';

import { bookingTestData } from '../../src/data/booking.data';
import { createBookingData } from '../../src/utils/booking-data.factory';
import { createRoomData } from '../../src/data/room.data';

test.describe('Booking API - Positive Scenarios', () => {
  for (const dataSet of bookingTestData) {
    test(`Create and retrieve booking - ${dataSet.description}`, async ({
      roomApi,
      bookingApi
    }) => {
      // Arrange: Generate a unique identifier for this test.
      const descriptionIdentifier = `ROOM-AUTOMATION-${randomUUID()}`;

      const roomData = createRoomData(descriptionIdentifier);

      // Act: Create the room.
      await test.step('Create room', async () => {
        const response = await roomApi.createRoom(roomData);

        expect(response.success).toBe(true);
      });

      // Act: Retrieve the room using its unique description identifier.
      const room = await test.step(
        'Retrieve created room and validate room ID',
        async () => {
          const createdRoom = await roomApi.getRoomByDescription(
            descriptionIdentifier
          );

          expect(createdRoom.description).toContain(
            descriptionIdentifier
          );

          expect(createdRoom.roomName).toBe(roomData.roomName);
          expect(createdRoom.type).toBe(roomData.type);
          expect(createdRoom.roomPrice).toBe(roomData.roomPrice);
          expect(createdRoom.roomid).toBeGreaterThan(0);

          return createdRoom;
        }
      );

      // Arrange: Generate booking data using the real room ID.
      const booking = createBookingData(dataSet, room.roomid);

      // Act: Create the booking.
      const createdBooking = await test.step(
        'Create booking',
        async () => {
          const response = await bookingApi.createBooking(booking);

          expect(response.bookingid).toBeGreaterThan(0);

          return response;
        }
      );

      // Act: Retrieve bookings associated with the created room.
      const retrievedBooking = await test.step(
        'Retrieve booking by room ID',
        async () => {
          const response = await bookingApi.getBookingsByRoomId(
            room.roomid
          );

          const matchingBooking = response.bookings.find(
            item => item.bookingid === createdBooking.bookingid
          );

          if (!matchingBooking) {
            throw new Error(
              `Booking ${createdBooking.bookingid} was not found in room ${room.roomid}.`
            );
          }

          return matchingBooking;
        }
      );

      // Assert: Validate booking identity.
      await test.step('Validate booking identifier', async () => {
        expect(retrievedBooking.bookingid).toBe(
          createdBooking.bookingid
        );
      });

      // Assert: Validate all persisted booking information.
      await test.step('Validate persisted booking data', async () => {
        expect(retrievedBooking).toMatchObject({
          bookingid: createdBooking.bookingid,
          roomid: room.roomid,
          firstname: booking.firstname,
          lastname: booking.lastname,
          depositpaid: booking.depositpaid,
          bookingdates: {
            checkin: booking.bookingdates.checkin,
            checkout: booking.bookingdates.checkout
          }
        });
      });
    });
  }
});