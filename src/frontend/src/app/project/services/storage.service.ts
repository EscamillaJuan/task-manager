import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _cacheToken: string | null = null;
    private TOKEN_KEY = "AUTH_TOKEN_KEY";

    setToken(token: string) {
        if (!window) {
            return;
        }
        this._cacheToken = token;
        window.localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null | void {
        if (!window) {
            return;
        }
        if (!this._cacheToken) {
            this._cacheToken = window.localStorage.getItem(this.TOKEN_KEY);
        }
        return this._cacheToken;
    }

    clearToken() {
        if (!window) {
            return;
        }
        this._cacheToken = null;
        window.localStorage.removeItem(this.TOKEN_KEY);
    }
}
