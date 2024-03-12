import { makeAutoObservable } from 'mobx';

export default class OrderStore {
  constructor() {
    this._orders = [];
    this._orderProducts = [];
    makeAutoObservable(this);
  }

  get orders() {
    return this._orders;
  }
  setOrders(orders) {
    let sortOrders = orders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    this._orders = sortOrders;
  }

  get orderProducts() {
    return this._orderProducts;
  }
  setOrderProducts(products) {
    this._orderProducts = products;
  }
}
