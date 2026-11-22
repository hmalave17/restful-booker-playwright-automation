
import { expect, Page, Locator } from '@playwright/test';

export class ReservationPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly calendarReserveButton: Locator;
  private readonly formReserveButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');

    this.calendarReserveButton = page.locator('#doReservation');

    this.formReserveButton = page
      .locator('button.btn-primary')
      .filter({ hasText: /^Reserve Now$/ });
  }


async verifyReservationPage(): Promise<void> {
  await expect(this.page.locator('body')).toContainText('Suite Room');
  await expect(this.calendarReserveButton).toBeVisible();
}


  async openBookingForm(): Promise<void> {
    await this.calendarReserveButton.click();

    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
  }

  async fillGuestDetails(data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstname);
    await this.lastNameInput.fill(data.lastname);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async verifyGuestDetails(data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await expect(this.firstNameInput).toHaveValue(data.firstname);
    await expect(this.lastNameInput).toHaveValue(data.lastname);
    await expect(this.emailInput).toHaveValue(data.email);
    await expect(this.phoneInput).toHaveValue(data.phone);
  }

  async submitBookingForm(): Promise<void> {
    await expect(this.formReserveButton).toBeVisible();
    await expect(this.formReserveButton).toBeEnabled();

    await this.formReserveButton.click();
  }

  async verifyBookingConfirmed(): Promise<void> {
    await expect(
      this.page.getByText('Booking Confirmed', { exact: true })
    ).toBeVisible();
  }
}
