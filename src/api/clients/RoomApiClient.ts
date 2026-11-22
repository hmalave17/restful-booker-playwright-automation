
import { APIRequestContext } from '@playwright/test';

import {
  CreateRoomRequest,
  Room
} from '../models/Room';

import {
  CreateRoomResponse,
  RoomListResponse
} from '../models/RoomResponse';

export class RoomApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly validateToken: () => Promise<void>,
    private readonly token: string
  ) {}

  private get headers() {
    return {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Cookie': `token=${this.token}`,
      'Origin': 'https://automationintesting.online',
      'Accept-Language': 'en-GB,en;q=0.5'
    };
  }

  async createRoom(
    room: CreateRoomRequest
  ): Promise<CreateRoomResponse> {
    await this.validateToken();

    const response = await this.request.post(
      '/api/room',
      {
        data: room,
        headers: this.headers
      }
    );

    if (!response.ok()) {
      const responseBody = await response.text();

      throw new Error(
        `Room creation failed. HTTP status: ${response.status()}. Response: ${responseBody}`
      );
    }

    const responseBody =
      (await response.json()) as CreateRoomResponse;

    if (responseBody.success !== true) {
      throw new Error(
        'Room creation was not confirmed by the API.'
      );
    }

    return responseBody;
  }

  async getRooms(): Promise<Room[]> {
    await this.validateToken();

    const response = await this.request.get(
      '/api/room',
      {
        headers: this.headers
      }
    );

    if (!response.ok()) {
      const responseBody = await response.text();

      throw new Error(
        `Room retrieval failed. HTTP status: ${response.status()}. Response: ${responseBody}`
      );
    }

    const responseBody =
      (await response.json()) as RoomListResponse;

    if (!Array.isArray(responseBody.rooms)) {
      throw new Error(
        'Room retrieval response does not contain a valid rooms collection.'
      );
    }

    return responseBody.rooms;
  }

  async getRoomByDescription(
    descriptionIdentifier: string
  ): Promise<Room> {
    if (descriptionIdentifier.trim().length === 0) {
      throw new Error(
        'Room description identifier cannot be empty.'
      );
    }

    const rooms = await this.getRooms();

    const matchingRooms = rooms.filter(
      room => room.description.includes(descriptionIdentifier)
    );

    if (matchingRooms.length === 0) {
      throw new Error(
        `Room containing description identifier ${descriptionIdentifier} was not found.`
      );
    }

    if (matchingRooms.length > 1) {
      throw new Error(
        `Multiple rooms found containing description identifier ${descriptionIdentifier}.`
      );
    }

    const room = matchingRooms[0];

    if (!Number.isInteger(room.roomid) || room.roomid <= 0) {
      throw new Error(
        `Room containing identifier ${descriptionIdentifier} does not have a valid room ID.`
      );
    }

    return room;
  }

  async getRoomByName(roomName: string): Promise<Room> {
    const rooms = await this.getRooms();

    const matchingRooms = rooms.filter(
      room => room.roomName === roomName
    );

    if (matchingRooms.length === 0) {
      throw new Error(
        `Room with name ${roomName} was not found.`
      );
    }

    if (matchingRooms.length > 1) {
      throw new Error(
        `Multiple rooms found with name ${roomName}.`
      );
    }

    const room = matchingRooms[0];

    if (!Number.isInteger(room.roomid) || room.roomid <= 0) {
      throw new Error(
        `Room ${roomName} does not contain a valid room ID.`
      );
    }

    return room;
  }
}
