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
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var _dataObjects_1 = require("../../_dataObjects");
var data_service_1 = require("../../_services/data-service");
var detail_component_component_1 = require("../../_controls/detail-component.component");
var _services_1 = require("../../_services");
var ProfileComponent = /** @class */ (function (_super) {
    __extends(ProfileComponent, _super);
    function ProfileComponent(_dataService, _authenticationService, Route) {
        var _this = _super.call(this, Route) || this;
        _this._dataService = _dataService;
        _this._authenticationService = _authenticationService;
        _this.Route = Route;
        _this.User = new _dataObjects_1.User;
        return _this;
    }
    Object.defineProperty(ProfileComponent.prototype, "User", {
        get: function () {
            return this.BusinessObject;
        },
        set: function (user) {
            this.BusinessObject = user;
        },
        enumerable: false,
        configurable: true
    });
    ProfileComponent.prototype.ngOnInit = function () {
        this.BusinessObjectId = this._authenticationService.CurrentUserId;
        this.Load();
    };
    ProfileComponent.prototype.LoadControlsData = function () {
        var _this = this;
        var criteria = {};
        var dataRequest = new _dataObjects_1.DataRequest();
        dataRequest.Procedure = "GetSecurityQuestionTypes";
        dataRequest.Parameters = JSON.stringify(criteria);
        this._dataService.ExecuteRequest(dataRequest)
            .subscribe(function (result) {
            _this.SecurityQuestionTypes = result;
        }, function (error) {
            console.error(error);
        });
    };
    ProfileComponent.prototype.GetData = function () {
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
    ProfileComponent.prototype.ValidateData = function () {
        return true;
    };
    ProfileComponent.prototype.SaveData = function () {
        var dataRequest = new _dataObjects_1.DataRequest();
        dataRequest.Procedure = "SaveUser";
        dataRequest.Parameters = JSON.stringify(this.User);
        this._dataService.ExecuteRequest(dataRequest)
            .subscribe(function (result) {
            var resultSet = result;
        }, function (error) {
            console.error(error);
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html'
        }),
        __param(0, core_1.Inject(data_service_1.DataService)),
        __param(1, core_1.Inject(_services_1.AuthenticationService))
    ], ProfileComponent);
    return ProfileComponent;
}(detail_component_component_1.DetailComponent));
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map