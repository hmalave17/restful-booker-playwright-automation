
import { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async openReservation(
    roomId: number,
    checkin: string,
    checkout: string
  ): Promise<void> {
    await this.page.goto(
      `/reservation/${roomId}?checkin=${checkin}&checkout=${checkout}`,
      { waitUntil: 'domcontentloaded' }
    );
  }
}
