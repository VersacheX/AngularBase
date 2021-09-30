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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailComponent = void 0;
var core_1 = require("@angular/core");
var base_component_component_1 = require("./base-component.component");
var DetailComponent = /** @class */ (function (_super) {
    __extends(DetailComponent, _super);
    function DetailComponent(Route) {
        var _this = _super.call(this) || this;
        _this.Route = Route;
        return _this;
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.Route.snapshot.params['id'];
        this.Route.params.subscribe(function (params) {
            id = +params['id'];
            _this.BusinessObjectId = id;
            _this.Load();
        });
    };
    DetailComponent.prototype.Load = function () {
        this.LoadControlsData();
        if (this.BusinessObjectId > 0) {
            this.GetData();
        }
        else {
            this.CreateData();
        }
    };
    DetailComponent.prototype.LoadControlsData = function () {
    };
    DetailComponent.prototype.CreateData = function () {
    };
    DetailComponent.prototype.GetData = function () {
    };
    DetailComponent.prototype.LoadDataGridsData = function () {
    };
    DetailComponent.prototype.Save = function () {
        if (this.ValidateSaveData()) {
            this.CorrectSaveData();
            this.SaveData();
        }
    };
    DetailComponent.prototype.ValidateSaveData = function () {
        return true;
    };
    DetailComponent.prototype.CorrectSaveData = function () {
    };
    DetailComponent.prototype.SaveData = function () {
    };
    DetailComponent = __decorate([
        core_1.Component({})
    ], DetailComponent);
    return DetailComponent;
}(base_component_component_1.BaseComponent));
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=detail-component.component.js.map