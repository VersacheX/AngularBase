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
exports.ActivateAccountComponent = void 0;
var core_1 = require("@angular/core");
var _dataObjects_1 = require("../../_dataObjects");
var data_service_1 = require("../../_services/data-service");
var ActivateAccountComponent = /** @class */ (function () {
    function ActivateAccountComponent(_dataService, Route, _router) {
        this._dataService = _dataService;
        this.Route = Route;
        this._router = _router;
        this.User = new _dataObjects_1.User;
    }
    ActivateAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.User.ActivationCode = this.Route.snapshot.paramMap.get('activationcode');
        this._dataService.ActivateAccount(this.User)
            .subscribe(function (result) {
            //check if return type is dataerror
            //create dataerror dataobject for internal validation error message
            //let resultSet: User = result as User;
            //if (resultSet && resultSet.length > 0) {
            _this.User = result; //resultSet;
            //display success message
            _this._router.navigate(['/login/']);
            //}
        }, function (error) {
            //display fail message         
            _this._router.navigate(['/login/']);
            console.error(error);
        });
    };
    ActivateAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-activate-account',
            templateUrl: './activate-account.component.html'
        }),
        __param(0, core_1.Inject(data_service_1.DataService))
    ], ActivateAccountComponent);
    return ActivateAccountComponent;
}());
exports.ActivateAccountComponent = ActivateAccountComponent;
//# sourceMappingURL=activate-account.component.js.map