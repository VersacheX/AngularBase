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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var login_information_1 = require("../../_dataObjects/login-information");
var operators_1 = require("rxjs/operators");
var _services_1 = require("../../_services");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_router, _authenticationService) {
        this._router = _router;
        this._authenticationService = _authenticationService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.CreateData();
    };
    LoginComponent.prototype.CreateData = function () {
        this.LoginInformation = new login_information_1.LoginInformation();
    };
    LoginComponent.prototype.Login = function () {
        var _this = this;
        this._authenticationService.Login(this.LoginInformation)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            _this._router.navigate(['/']);
        }, function (error) {
        });
    };
    LoginComponent.prototype.ResetPassword = function () {
        //Navigate to resetPassword Component
        if (this.LoginInformation.Username && this.LoginInformation.Username.trim().length > 0) {
            this._router.navigate(['/reset-password/', this.LoginInformation.Username]);
        }
        else {
            //Display username required message
        }
    };
    LoginComponent.prototype.CreateAccount = function () {
        //Navigate to CreateAccount Component
        this._router.navigate(['/create-account/']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html'
        }),
        __param(1, core_1.Inject(_services_1.AuthenticationService))
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map