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
exports.ResetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var _dataObjects_1 = require("../../_dataObjects");
var data_service_1 = require("../../_services/data-service");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(_router, _activatedRoute, _dataService) {
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this._dataService = _dataService;
    }
    //Need to pass in a Username to this component.  the username will be used to grab the security questions. only grab the questions and the username.
    //the answers will be posted with the username to determine if password reset is ok.
    //e-mail will be sent with the temporary password
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.GetData();
    };
    ResetPasswordComponent.prototype.GetData = function () {
        var _this = this;
        this.User = new _dataObjects_1.User();
        this.User.Username = this._activatedRoute.snapshot.paramMap.get('username');
        if (this.User.Username && this.User.Username.trim().length > 0) {
            this._dataService.GetUserSecurityQuestions(this.User)
                .subscribe(function (result) {
                var resultSet = result;
                if (resultSet && resultSet.length > 0) {
                    _this.User = resultSet[0];
                }
            }, function (error) {
                console.error(error);
            });
        }
        else {
            this._router.navigate(['/login/']);
        }
    };
    ResetPasswordComponent.prototype.ResetPassword = function () {
        var _this = this;
        this._dataService.ResetPassword(this.User)
            .subscribe(function (result) {
            var resultSet = result;
            if (resultSet && resultSet.length > 0) {
                //Display Message "A temporary password has been sent to the e-mail on file"
                _this.User = resultSet[0];
            }
        }, function (error) {
            console.error(error);
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html'
        }),
        __param(2, core_1.Inject(data_service_1.DataService))
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map