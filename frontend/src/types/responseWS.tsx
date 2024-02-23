export interface RegData {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
}

export type WinnersData = {
  name: string;
  wins: number;
}[];

export type RoomsData = {
  roomId: number | string;
  roomUsers: {
    name: string;
    index: string | number;
  }[];
}[];
