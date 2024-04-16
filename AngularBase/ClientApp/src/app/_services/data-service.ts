import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataRequest, User } from '../_dataObjects';



@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) {

  }

  ExecuteRequest(dataRequest: DataRequest) {
    return this._http.post<any>(this._baseUrl + 'Execute/ExecuteProcedure', dataRequest)
      .pipe(map(data => {
        return data;
      }));
  }

  NoAuthExecuteRequest(dataRequest: DataRequest) {
    return this._http.post<any>(this._baseUrl + 'Execute/NoAuthExecuteProcedure', dataRequest)
      .pipe(map(data => {
        return data;
      }));
  }

  ChangePassword(userInfo: User) {
    return this._http.post<User>(this._baseUrl + 'Account/ChangePassword', userInfo)
      .pipe(map(user => {
        return user;
      }));
  }

  ResetPassword(userInfo: User) {
    return this._http.post<User>(this._baseUrl + 'Account/ResetPassword', userInfo)
      .pipe(map(user => {
        return user;
      }));
  }

  CreateAccount(userInfo: User) {
    return this._http.post<User>(this._baseUrl + 'Account/CreateAccount', userInfo)
      .pipe(map(user => {
        return user;
      }));
  }

  ActivateAccount(userInfo: User) {
    return this._http.post<User>(this._baseUrl + 'Account/ActivateAccount', userInfo)
      .pipe(map(user => {
        return user;
      }));
  }

  GetUserSecurityQuestions(userInfo: User) {
    return this._http.post<User>(this._baseUrl + 'Account/GetSecurityQuestions', userInfo)
      .pipe(map(user => {
        return user;
      }));
  }
}
