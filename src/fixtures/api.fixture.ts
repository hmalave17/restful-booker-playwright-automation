
import {
  test as base,
  APIRequestContext
} from '@playwright/test';

import { environment } from '../config/environment';

import { AuthApiClient } from '../api/clients/AuthApiClient';
import { BookingApiClient } from '../api/clients/BookingApiClient';
import { RoomApiClient } from '../api/clients/RoomApiClient';

interface ApiFixtures {
  apiRequest: APIRequestContext;
  authApi: AuthApiClient;
  token: string;
  validateToken: () => Promise<void>;
  bookingApi: BookingApiClient;
  roomApi: RoomApiClient;
}

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({ playwright }, use) => {
    const apiRequest = await playwright.request.newContext({
      baseURL: environment.baseUrl,
      extraHTTPHeaders: {
        'Accept': 'application/json'
      }
    });

    await use(apiRequest);

    await apiRequest.dispose();
  },

  authApi: async ({ apiRequest }, use) => {
    const authApi = new AuthApiClient(apiRequest);

    await use(authApi);
  },

  token: async ({ authApi }, use) => {
    const token = await authApi.login();

    await authApi.validateToken(token);

    await use(token);
  },

  validateToken: async ({ authApi, token }, use) => {
    const validateToken = async (): Promise<void> => {
      await authApi.validateToken(token);
    };

    await use(validateToken);
  },

  bookingApi: async (
    { apiRequest, validateToken, token },
    use
  ) => {
    const bookingApi = new BookingApiClient(
      apiRequest,
      validateToken,
      token
    );

    await use(bookingApi);
  },

  roomApi: async (
    { apiRequest, validateToken, token },
    use
  ) => {
    const roomApi = new RoomApiClient(
      apiRequest,
      validateToken,
      token
    );

    await use(roomApi);
  }
});

export { expect } from '@playwright/test';
