import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { PrivateApiService } from './private-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiLogin = environment.apiUrl + environment.apiUrlLogin;
  apiUrlUser = environment.apiUrl + environment.apiUrlUser;
  apiPasswordReset = environment.apiUrl + environment.apiPasswordReset;

  user: any = null;

  private isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private privateApi: PrivateApiService,
    public afAuth: AngularFireAuth
  ) {
    initializeApp(environment.firebase);
    this.isAuth();
  }

  get isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  isAuth() {
    let userDataString = localStorage.getItem('user');
    if (userDataString) {
      this.user = JSON.parse(userDataString);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
    return this.isAuthenticated;
  }

  auth(user: User) {
    const body = {
      email: user.email || '',
      password: user.password,
    };
    return this.afAuth.signInWithEmailAndPassword(body.email, body.password);
  }

  storeUser(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  checkIfUserExistsInBackend() {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result && result.credential) {
          const credential = result.credential;
          const user = result.user;
          if (user) {
            this.isAuthenticated.next(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(user: any) {
    this.storeUser(user);
    this.isAuthenticated.next(true);

    user.getIdToken().then((tkn: any) => {
      localStorage.setItem('access', tkn);
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.isAuthenticated.next(false);
      localStorage.clear();
    });
  }

  passwordReset(body: any) {
    return this.afAuth.sendPasswordResetEmail(body.email);
  }
}
