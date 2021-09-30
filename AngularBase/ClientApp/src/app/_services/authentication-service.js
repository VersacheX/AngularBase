"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(_router, http, _baseUrl) {
        this._router = _router;
        this.http = http;
        this._baseUrl = _baseUrl;
        this._userSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        this.User = this._userSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "UserValue", {
        get: function () {
            return this._userSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "IsLoggedIn", {
        get: function () {
            var currentUser = JSON.parse(JSON.stringify(this.UserValue));
            return currentUser != null && currentUser.authData != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "CurrentUserId", {
        get: function () {
            var currentUser = JSON.parse(JSON.stringify(this.UserValue));
            return currentUser != null ? currentUser.id : 0;
        },
        enumerable: false,
        configurable: true
    });
    AuthenticationService.prototype.Login = function (loginInfo) {
        var _this = this;
        return this.http.post(this._baseUrl + 'Authorization/Authenticate', loginInfo)
            .pipe(operators_1.map(function (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            _this._userSubject.next(user);
            return user;
        }));
    };
    AuthenticationService.prototype.LogOut = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this._userSubject.next(null);
        this._router.navigate(['/login']);
    };
    AuthenticationService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __param(2, core_1.Inject('BASE_URL'))
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication-service.js.map