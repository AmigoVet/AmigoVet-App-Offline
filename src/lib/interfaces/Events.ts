export interface Events {
  id: string;
  animalId: string;
  animalName: string;
  comentario: string;
  created_at: string;
  dateEvent: string;
  dateNotifi: string;
  sendNotifi: sendNotifi;
}

export type sendNotifi = '1d' | '2d' | '3d' | '4d' | '5d' | '1w' | '2w';

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  androidChannelId?: string;
  iosSound?: string;
}
