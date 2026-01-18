import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private searchKey = new BehaviorSubject('');
  searchKey$ = this.searchKey.asObservable();
  searchUpdate(k: string): void {
    this.searchKey.next(k)
  }
}
