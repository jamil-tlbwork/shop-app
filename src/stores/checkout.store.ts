import axios from "axios";
import { authStoreInstance } from "./auth.store";
import { ICartItem } from "./../models/product";
import { makeAutoObservable } from "mobx";
import { Payment, User } from "./../models";

const url = "https://orderdetails.free.beeceptor.com";

export class CheckoutStore {
  user: User;
  paymentInfo: Payment;

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

  validateUserProp(propName: keyof User): string {
    switch (propName) {
      case "name": {
        if (this.user.name?.length === 0) {
          return "Name should be filled";
        }
        break;
      }
      case "email": {
        if (
          this.user.email?.length === 0 ||
          (this.user.email && !this.isValidUserEmail())
        ) {
          return "Email should filled and valid";
        }
        break;
      }
      case "phone": {
        if (
          this.user.phone?.length === 0 ||
          (this.user.phone && !this.isValidPhoneNumber())
        ) {
          return "Phone number should filled (Accept numbers only and renage between 8,15) and valid";
        }
        break;
      }
      case "address": {
        if (this.user.address?.length === 0) {
          return "Address should filled and valid";
        }
        break;
      }
    }
  }

  validateUser(): boolean {
    return (
      // if some field are not valid
      !!(Object.keys(this.user) as Array<keyof User>)
        .map(this.validateUserProp.bind(this))
        .filter(Boolean).length ||
      // if not dirty field
      Object.values(this.user).some((val) => val === undefined)
    );
  }

  private isValidUserEmail(): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.user.email.toLowerCase());
  }

  private isValidPhoneNumber(): boolean {
    const re = /^([0-9]){8,15}$/g;
    return re.test(this.user.phone);
  }

  private destroy() {
    this.user = new User();
    this.paymentInfo = new Payment();
  }
}
