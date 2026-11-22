export interface Room {
  roomid: number;
  roomName: string;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  roomPrice: number;
  features: string[];
}

export interface CreateRoomRequest {
  roomName: string;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  roomPrice: number;
  features: string[];
}