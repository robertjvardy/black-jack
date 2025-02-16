export class SeatInfoDto {
  seatIndex: number;
  seatKey: string;

  constructor(seatIndex: number | string, seatKey: string) {
    if (typeof seatIndex === "string") {
      this.seatIndex = parseInt(seatIndex);
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
