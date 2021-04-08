import { action, computed, makeObservable, observable } from "mobx";
import { ICartItem, IProduct } from "./../models/product";

export class CartStore {
  _items: { [productID: number]: ICartItem } = {};

  constructor() {
    makeObservable(this, {
      _items: observable,
      count: computed,
      items: computed,
      addItem: action,
      removeItem: action,
      destroy: action,
    });
  }

  get count() {
    return Object.values(this._items).reduce(
      (sum, item) => sum + item.count,
      0,
    );
  }

  get items() {
    return Object.values(this._items);
  }

  get totalPrice() {
    return Object.values(this._items)
      .reduce((sum, item) => sum + item.product.price * item.count, 0)
      .toFixed(2);
  }

  getItemCount(productId: number) {
    if (this._items[productId]) {
      return this._items[productId].count;
    }
    return 0;
  }

  addItem(product: IProduct) {
    if (this._items[product.id]) {
      this._items[product.id].count++;
    } else {
      this._items[product.id] = { product, count: 1 };
    }
  }

  removeItem(productId: number) {
    if (!this._items[productId]) {
      return;
    }
    if (this._items[productId].count > 1) {
      this._items[productId].count--;
    } else {
      delete this._items[productId];
    }
  }

  destroy() {
    this._items = {};
  }
}
