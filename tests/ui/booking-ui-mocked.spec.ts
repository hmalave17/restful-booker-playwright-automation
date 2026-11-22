
import { test, expect } from '@playwright/test';

import { HomePage } from '../../src/pages/HomePage';
import { ReservationPage } from '../../src/pages/ReservationPage';
import { bookingTestData } from '../../src/data/booking.data';
import { createBookingData } from '../../src/utils/booking-data.factory';
import { Booking } from '../../src/api/models/Booking';

test.use({
  trace: 'on',
  screenshot: 'only-on-failure',
});

test('UI Booking - Complete reservation form using mocked backend', async ({
  page,
}, testInfo) => {
  const roomId = 4;
  const checkin = '2026-12-01';
  const checkout = '2026-12-08';

  const guest = createBookingData(bookingTestData[0], roomId);

  let capturedBooking: Booking | undefined;
  const mockEvidence: string[] = [];

  // Mock room details.
  await page.route(`**/api/room/${roomId}`, async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    mockEvidence.push(`GET /api/room/${roomId} -> 200 MOCKED`);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        roomid: roomId,
        roomName: '81',
        type: 'Suite',
        accessible: true,
        image: '',
        description: 'Automation test room',
        roomPrice: 100,
        features: ['WiFi', 'Safe'],
      }),
    });
  });

  // Mock room availability.
  await page.route(`**/api/report/room/${roomId}`, async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }

    mockEvidence.push(`GET /api/report/room/${roomId} -> 200 MOCKED`);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        bookings: [],
      }),
    });
  });

  // Capture booking request and simulate successful backend response.
  await page.route('**/api/booking', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }

    capturedBooking = route.request().postDataJSON() as Booking;

    mockEvidence.push('POST /api/booking -> 201 MOCKED');

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        bookingid: 999,
      }),
    });
  });

  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Navigate to the previously inspected reservation page.
  await homePage.openReservation(roomId, checkin, checkout);

  // Verify room details and open the reservation form.
  await reservationPage.verifyReservationPage();
  await reservationPage.openBookingForm();

  // Fill guest information.
  await reservationPage.fillGuestDetails({
    firstname: guest.firstname,
    lastname: guest.lastname,
    email: guest.email!,
    phone: guest.phone!,
  });

  await reservationPage.verifyGuestDetails({
    firstname: guest.firstname,
    lastname: guest.lastname,
    email: guest.email!,
    phone: guest.phone!,
  });

  // Submit reservation.
  await reservationPage.submitBookingForm();

  // Verify confirmation.
  await reservationPage.verifyBookingConfirmed();

  // Validate captured frontend payload.
  expect(capturedBooking).toBeDefined();

  if (!capturedBooking) {
    throw new Error('Booking request was not captured.');
  }

  const booking = capturedBooking;

  expect(booking.roomid).toBe(roomId);
  expect(booking.firstname).toBe(guest.firstname);
  expect(booking.lastname).toBe(guest.lastname);
  expect(booking.email).toBe(guest.email);
  expect(booking.phone).toBe(guest.phone);

  // Validate the deposit value observed in the UI request.
  expect(booking.depositpaid).toBe(false);

  // Validate the exact dates sent through the reservation URL.
  expect(booking.bookingdates).toBeDefined();
  expect(booking.bookingdates.checkin).toBe(checkin);
  expect(booking.bookingdates.checkout).toBe(checkout);

  expect(
    new Date(booking.bookingdates.checkout).getTime()
  ).toBeGreaterThan(
    new Date(booking.bookingdates.checkin).getTime()
  );

  // Verify that all expected mocked requests were executed.
  expect(mockEvidence).toHaveLength(3);
  expect(mockEvidence).toContain(
    `GET /api/room/${roomId} -> 200 MOCKED`
  );
  expect(mockEvidence).toContain(
    `GET /api/report/room/${roomId} -> 200 MOCKED`
  );
  expect(mockEvidence).toContain(
    'POST /api/booking -> 201 MOCKED'
  );

  // Attach evidence to the Playwright report.
  await testInfo.attach('booking-payload.json', {
    body: Buffer.from(JSON.stringify(booking, null, 2)),
    contentType: 'application/json',
  });

  await testInfo.attach('mocked-backend-evidence.txt', {
    body: Buffer.from(mockEvidence.join('\n')),
    contentType: 'text/plain',
  });

  await page.screenshot({
    path: testInfo.outputPath('booking-confirmed.png'),
    fullPage: true,
  });

  console.log('CAPTURED BOOKING PAYLOAD:');
  console.log(JSON.stringify(booking, null, 2));

  console.log('MOCKED BACKEND EVIDENCE:');
  console.log(mockEvidence.join('\n'));
});
