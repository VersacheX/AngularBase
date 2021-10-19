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
exports.CreateAccountComponent = void 0;
var core_1 = require("@angular/core");
var _dataObjects_1 = require("../../_dataObjects");
var data_service_1 = require("../../_services/data-service");
var detail_component_component_1 = require("../../_controls/detail-component.component");
var CreateAccountComponent = /** @class */ (function (_super) {
    __extends(CreateAccountComponent, _super);
    function CreateAccountComponent(_dataService, Route) {
        var _this = _super.call(this, Route) || this;
        _this._dataService = _dataService;
        _this.Route = Route;
        _this.User = new _dataObjects_1.User();
        return _this;
    }
    Object.defineProperty(CreateAccountComponent.prototype, "User", {
        get: function () {
            return this.BusinessObject;
        },
        set: function (user) {
            this.BusinessObject = user;
        },
        enumerable: false,
        configurable: true
    });
    CreateAccountComponent.prototype.ngOnInit = function () {
        this.Load();
    };
    CreateAccountComponent.prototype.LoadControlsData = function () {
        var _this = this;
        var criteria = {};
        var dataRequest = new _dataObjects_1.DataRequest();
        dataRequest.Procedure = "GetSecurityQuestionTypes";
        dataRequest.Parameters = JSON.stringify(criteria);
        this._dataService.NoAuthExecuteRequest(dataRequest)
            .subscribe(function (result) {
            _this.SecurityQuestionTypes = result;
        }, function (error) {
            console.error(error);
        });
    };
    CreateAccountComponent.prototype.CreateData = function () {
    };
    CreateAccountComponent.prototype.ValidateSaveData = function () {
        if (this.User.Password != this.User.ConfirmPassword) {
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
    CreateAccountComponent.prototype.SaveData = function () {
        var _this = this;
        this._dataService.CreateAccount(this.User)
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
    CreateAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-create-account',
            templateUrl: './create-account.component.html'
        }),
        __param(0, core_1.Inject(data_service_1.DataService))
    ], CreateAccountComponent);
    return CreateAccountComponent;
}(detail_component_component_1.DetailComponent));
exports.CreateAccountComponent = CreateAccountComponent;
//# sourceMappingURL=create-account.component.js.map