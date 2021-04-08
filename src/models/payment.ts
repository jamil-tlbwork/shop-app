import { makeAutoObservable } from "mobx";

export class Payment {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  name: string;

  constructor() {
    makeAutoObservable(this);
  }
}
