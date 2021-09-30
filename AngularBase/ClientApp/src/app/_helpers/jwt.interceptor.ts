import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService, @Inject('BASE_URL') private _baseUrl: string) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = JSON.parse(JSON.stringify(this._authenticationService.UserValue));
    const isLoggedIn = this._authenticationService.IsLoggedIn;
    const isApiUrl = request.url.indexOf(this._baseUrl) == 0;
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.authData}`
        }
      });
    }

    return next.handle(request);
  }
}
