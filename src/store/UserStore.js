import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._user = {};
    this._isAuth = false;
    makeAutoObservable(this);
  }

  get user() {
    return this._user;
  }
  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }
  setIsAuth(boolean) {
    this._isAuth = boolean;
  }
}
