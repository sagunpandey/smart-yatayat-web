export class User {
  userInfoId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: number;
  email: string;
  balance: number;
  userRfids: UserRfid[];
}

export class UserRfid {
  userRfidId: number;
  rfid: Rfid;
  active: number;
}

export class Rfid {
  rfidId: number;
  tag0: string;
  tag1: string;
  tag2: string;
  tag3: string;
  pin: string;
}
