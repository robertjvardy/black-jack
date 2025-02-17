import { PlayerIndexType } from "../types/player";

export class SeatInfoDto {
  seatIndex: PlayerIndexType;
  seatKey: string;

  constructor(seatIndex: PlayerIndexType | string, seatKey: string) {
    if (typeof seatIndex === "string") {
      this.seatIndex = parseInt(seatIndex) as PlayerIndexType;
    } else {
      this.seatIndex = seatIndex;
    }
    this.seatKey = seatKey;
  }
}

export class SeatIndexDto {
  seatIndex: number;

  constructor(seatIndex: number | string) {
    if (typeof seatIndex === "string") {
      this.seatIndex = parseInt(seatIndex);
    } else {
      this.seatIndex = seatIndex;
    }
  }
}
