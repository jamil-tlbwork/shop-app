import { productData } from "../models/product-data";
import { IProduct } from "./../models/product";
import { action, computed, makeObservable, observable } from "mobx";

export class ProductsStore {
  _products!: IProduct[];

  constructor() {
    makeObservable(this, {
      _products: observable,
      products: computed,
      fetchProduct: action,
      destroy: action,
    });
  }

  get products() {
    return this._products;
  }

  fetchProduct(): Promise<void> {
    return new Promise((res) => {
      setTimeout(() => {
        this._products = [...productData];
        res();
      }, 1000);
    });
  }

  destroy() {
    this._products = null;
  }
}
