"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ChangePasswordComponent = void 0;
var core_1 = require("@angular/core");
var _dataObjects_1 = require("../../_dataObjects");
var data_service_1 = require("../../_services/data-service");
var detail_component_component_1 = require("../../_controls/detail-component.component");
var _services_1 = require("../../_services");
var ChangePasswordComponent = /** @class */ (function (_super) {
    __extends(ChangePasswordComponent, _super);
    function ChangePasswordComponent(_dataService, _authenticationService, Route) {
        var _this = _super.call(this, Route) || this;
        _this._dataService = _dataService;
        _this._authenticationService = _authenticationService;
        _this.Route = Route;
        _this.User = new _dataObjects_1.User;
        return _this;
    }
    Object.defineProperty(ChangePasswordComponent.prototype, "User", {
        get: function () {
            return this.BusinessObject;
        },
        set: function (user) {
            this.BusinessObject = user;
        },
        enumerable: false,
        configurable: true
    });
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.BusinessObjectId = this._authenticationService.CurrentUserId;
        this.Load();
    };
    ChangePasswordComponent.prototype.GetData = function () {
        var _this = this;
        var criteria = { "UserPK": this.BusinessObjectId };
        var dataRequest = new _dataObjects_1.DataRequest();
        dataRequest.Procedure = "GetUsers";
        dataRequest.Parameters = JSON.stringify(criteria);
        this._dataService.ExecuteRequest(dataRequest)
            .subscribe(function (result) {
            var resultSet = result;
            if (resultSet && resultSet.length > 0) {
                _this.User = resultSet[0];
            }
        }, function (error) {
            console.error(error);
        });
    };
    ChangePasswordComponent.prototype.ValidateData = function () {
        if (this.User.NewPassword != this.User.ConfirmPassword) {
            //Display error Passwords do not match
            //focus on NewPassword
            return false;
        }
        if (this.User.Password.trim() == '') {
            //Enter your current password
            //focus on CurrentPassword
            return false;
        }
        return true;
    };
    ChangePasswordComponent.prototype.SaveData = function () {
        var _this = this;
        this._dataService.ChangePassword(this.User)
            .subscribe(function (result) {
            //check if return type is dataerror
            //create dataerror dataobject for internal validation error message
            var resultSet = result;
            if (resultSet && resultSet.length > 0) {
                _this.User = resultSet[0];
            }
        }, function (error) {
            console.error(error);
        });
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html'
        }),
        __param(0, core_1.Inject(data_service_1.DataService)),
        __param(1, core_1.Inject(_services_1.AuthenticationService))
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}(detail_component_component_1.DetailComponent));
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change-password.component.js.map