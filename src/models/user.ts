import { makeAutoObservable } from "mobx";

export class User {
  name: string;
  address: string;
  phone: string;
  email: string;

  constructor() {
    makeAutoObservable(this);
  }
}
