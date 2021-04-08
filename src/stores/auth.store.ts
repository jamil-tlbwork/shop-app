import { action, computed, makeObservable, observable } from "mobx";

const TOKEN_KEY = "token_auth";

export class AuthStore {
  _token: string;

  constructor() {
    makeObservable(this, {
      _token: observable,
      isAuthenticated: computed,
      token: computed,
      login: action,
      logout: action,
    });
    this._token = localStorage.getItem(TOKEN_KEY);
  }

  get token() {
    return this._token;
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }

  get username(): string {
    return atob(this._token).split(":")[0];
  }

  login(username: string, password: string) {
    this._token = this.encryptUserInfo(username, password);
    localStorage.setItem(TOKEN_KEY, this._token);
  }

  logout() {
    this._token = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  private encryptUserInfo(username: string, password: string) {
    const token = `${username}:${password}`;
    // Base64 Encoding
    const hash = btoa(token);
    return hash;
  }
}

export const authStoreInstance = new AuthStore();
