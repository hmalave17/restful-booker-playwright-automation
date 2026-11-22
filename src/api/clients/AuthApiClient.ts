
import { APIRequestContext } from '@playwright/test';

import { environment } from '../../config/environment';
import { AuthCredentials } from '../models/AuthCredentials';
import { AuthTokenResponse } from '../models/AuthTokenResponse';
import { TokenValidationResponse } from '../models/TokenValidationResponse';

export class AuthApiClient {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async login(): Promise<string> {
    const credentials: AuthCredentials = {
      username: environment.apiUsername,
      password: environment.apiPassword
    };

    const response = await this.request.post(
      '/api/auth/login',
      {
        data: credentials,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok()) {
      throw new Error(
        `Authentication failed. HTTP status: ${response.status()}`
      );
    }

    const responseBody =
      (await response.json()) as AuthTokenResponse;

    if (
      typeof responseBody.token !== 'string' ||
      responseBody.token.trim().length === 0
    ) {
      throw new Error(
        'Authentication response does not contain a valid token.'
      );
    }

    return responseBody.token;
  }

  async validateToken(token: string): Promise<void> {
    const response = await this.request.post(
      '/api/auth/validate',
      {
        data: {
          token
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok()) {
      const responseBody = await response.text();

      throw new Error(
        `Token validation failed. HTTP status: ${response.status()}. Response: ${responseBody}`
      );
    }


    const responseBody =
      (await response.json()) as TokenValidationResponse;

    if (responseBody.valid !== true) {
      throw new Error(
        'Authentication token validation failed. The token is invalid.'
      );
    }
  }
}