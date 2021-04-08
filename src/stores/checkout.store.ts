import axios from "axios";
import { authStoreInstance } from "./auth.store";
import { ICartItem } from "./../models/product";
import { makeAutoObservable } from "mobx";
import { Payment, User } from "./../models";

const url = "https://orderdetails.free.beeceptor.com";

export class CheckoutStore {
  user!: User;
  paymentInfo!: Payment;

  constructor() {
    makeAutoObservable(this);
    this.user = new User();
    this.paymentInfo = new Payment();
  }

  submit(items: ICartItem[]): Promise<any> {
    return axios
      .post(
        url,
        {
          username: authStoreInstance.username,
          userInfo: this.user,
          paymentInfo: this.paymentInfo,
          items,
        },
        {
          headers: {
            Authorization: `Basic ${authStoreInstance.token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((resp) => {
        this.destroy();
        return resp.data;
      });
  }

  private destroy() {
    this.user = new User();
    this.paymentInfo = new Payment();
  }
}
