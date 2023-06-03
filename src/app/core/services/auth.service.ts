import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor() {}

  get isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login() {
    this.isAuthenticated.next(true);
  }
  logout() {
    this.isAuthenticated.next(false);
  }
}
