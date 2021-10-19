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
exports.DataService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var DataService = /** @class */ (function () {
    function DataService(_http, _baseUrl) {
        this._http = _http;
        this._baseUrl = _baseUrl;
    }
    DataService.prototype.ExecuteRequest = function (dataRequest) {
        return this._http.post(this._baseUrl + 'Execute/ExecuteProcedure', dataRequest)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    DataService.prototype.NoAuthExecuteRequest = function (dataRequest) {
        return this._http.post(this._baseUrl + 'Execute/NoAuthExecuteProcedure', dataRequest)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    DataService.prototype.ChangePassword = function (userInfo) {
        return this._http.post(this._baseUrl + 'Account/ChangePassword', userInfo)
            .pipe(operators_1.map(function (user) {
            return user;
        }));
    };
    DataService.prototype.ResetPassword = function (userInfo) {
        return this._http.post(this._baseUrl + 'Account/ResetPassword', userInfo)
            .pipe(operators_1.map(function (user) {
            return user;
        }));
    };
    DataService.prototype.CreateAccount = function (userInfo) {
        return this._http.post(this._baseUrl + 'Account/CreateAccount', userInfo)
            .pipe(operators_1.map(function (user) {
            return user;
        }));
    };
    DataService.prototype.ActivateAccount = function (userInfo) {
        return this._http.post(this._baseUrl + 'Account/ActivateAccount', userInfo)
            .pipe(operators_1.map(function (user) {
            return user;
        }));
    };
    DataService.prototype.GetUserSecurityQuestions = function (userInfo) {
        return this._http.post(this._baseUrl + 'Account/GetSecurityQuestions', userInfo)
            .pipe(operators_1.map(function (user) {
            return user;
        }));
    };
    DataService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __param(1, core_1.Inject('BASE_URL'))
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data-service.js.map