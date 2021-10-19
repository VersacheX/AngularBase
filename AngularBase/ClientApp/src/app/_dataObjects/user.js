"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User() {
        this.Username = '';
        this.Password = '';
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.SecurityQuestionType1FK = null;
        this.SecurityQuestionType2FK = null;
        this.SecurityQuestionDescription1 = '';
        this.SecurityQuestionDescription2 = '';
        this.SecurityQuestionAnswer1 = '';
        this.SecurityQuestionAnswer2 = '';
        this.ActivationCode = '';
        //Properties
        this.NewPassword = '';
        this.ConfirmPassword = '';
        //Account Details
        this.AuthData = '';
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map