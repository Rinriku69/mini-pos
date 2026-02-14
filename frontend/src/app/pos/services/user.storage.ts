import { APP_ID, inject, Injectable } from '@angular/core';
import { User } from '../models/types';
import { stringify } from 'postcss';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {
  private readonly keyName = `${inject(APP_ID)}-user` as const;

  set(user: User): void {
    return localStorage.setItem(this.keyName, JSON.stringify(user))
  }

  get(): User | null {
    return JSON.parse(localStorage.getItem(this.keyName) ?? 'null');
  }
}
