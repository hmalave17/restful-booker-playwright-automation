import { randomInt } from 'node:crypto';

import { CreateRoomRequest } from '../api/models/Room';

export function createRoomData(descriptionIdentifier: string): CreateRoomRequest {
  return {
    roomName: randomInt(1000, 10000).toString(),
    type: 'Suite',
    accessible: true,
    image: 'https://blog.postman.com/wp-content/uploads/2014/07/logo.png',
    description: `Automation assessment room. Identifier: ${descriptionIdentifier}`,
    roomPrice: 225,
    features: ['WiFi', 'Safe'],
  };
}