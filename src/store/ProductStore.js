import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  constructor() {
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    this._cartProducts = [];
    this._products = [];
    this._types = [];
    this._brands = [];
    makeAutoObservable(this);
  }

  get page() {
    return this._cartProducts;
  }
  setPage(page) {
    this._page = page;
  }

  get totalCount() {
    return this._totalCount;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get limit() {
    return this._limit;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  get cartProducts() {
    return this._cartProducts;
  }
  setCartProducts(products) {
    this._cartProducts = products;
  }
  addCartProduct(product) {
    let find = this._cartProducts.find(e => e.id === product.id);
    if (find) {
      this._cartProducts = [
        ...this._cartProducts.filter(e => e.id !== find.id),
        { ...product, quantity: find.quantity + 1 },
      ];
    } else {
      this._cartProducts = [...this._cartProducts, { ...product, quantity: 1 }];
    }
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }
  removeCartProduct(product) {
    this._cartProducts = this._cartProducts.filter(e => e.id !== product.id);
    if (this._cartProducts.length !== 0) {
      localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
    } else {
      localStorage.removeItem('cartProducts');
    }
  }
  setCartProductQuantity(product, quantity) {
    this._cartProducts = [
      ...this._cartProducts.map(e => {
        if (e.id === product.id) {
          return { ...e, quantity: Number(quantity) };
        } else {
          return e;
        }
      }),
    ];
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }

  get products() {
    return this._products;
  }
  setProducts(products) {
    this._products = products;
  }

  get types() {
    return this._types;
  }
  setTypes(types) {
    this._types = types;
  }

  get brands() {
    return this._brands;
  }
  setBrands(brands) {
    this._brands = brands;
  }
}
