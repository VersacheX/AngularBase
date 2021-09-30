import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { LoginInformation, User } from '../_dataObjects';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _userSubject: BehaviorSubject<User>;
  public User: Observable<User>;

  constructor(private _router: Router, private http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) {
    this._userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.User = this._userSubject.asObservable();
  }

  public get UserValue() {
    return this._userSubject.value;
  }

  public get IsLoggedIn(): boolean {
    const currentUser = JSON.parse(JSON.stringify(this.UserValue));

    return currentUser != null && currentUser.authData != null;
  }

  public get CurrentUserId(): number {
    const currentUser = JSON.parse(JSON.stringify(this.UserValue));

    return currentUser != null ? currentUser.id : 0;
  }



  Login(loginInfo: LoginInformation) {
    return this.http.post<User>(this._baseUrl + 'Authorization/Authenticate', loginInfo)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this._userSubject.next(user);
        return user;
      }));
  }

  LogOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this._userSubject.next(null);
    this._router.navigate(['/login']);
  }
}
