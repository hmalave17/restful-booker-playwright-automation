import { Room } from './Room';

export interface RoomListResponse {
  rooms: Room[];
}

export interface CreateRoomResponse {
  success: boolean;
}