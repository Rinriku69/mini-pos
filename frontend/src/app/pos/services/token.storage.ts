import { APP_ID, inject, Injectable } from '@angular/core';
import { stringify } from 'postcss';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private readonly keyName = `${inject(APP_ID)}-token` as const;

  set(token: string): void {
    return localStorage.setItem(this.keyName, token)
  }

  get(): string | null {
    return localStorage.getItem(this.keyName) ?? null
  }
}
