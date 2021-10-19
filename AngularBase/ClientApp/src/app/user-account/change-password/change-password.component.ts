import { Component, Inject, OnInit } from '@angular/core';

import { DataRequest, User } from '../../_dataObjects';
import { DataService } from '../../_services/data-service';
import { DetailComponent } from '../../_controls/detail-component.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends DetailComponent implements OnInit  {
  constructor(@Inject(DataService) private _dataService: DataService,
              @Inject(AuthenticationService) private _authenticationService: AuthenticationService,
              public Route: ActivatedRoute) {
    super(Route);

    this.User = new User;
  }

  public get User(): User  {
    return this.BusinessObject as User;
  }
  public set User(user: User) {
    this.BusinessObject = user;
  }
  public BusinessObjectId: number;

  ngOnInit() {
    this.BusinessObjectId = this._authenticationService.CurrentUserId;

    this.Load();
  }

  public GetData() {
    let criteria = { "UserPK": this.BusinessObjectId };

    let dataRequest: DataRequest = new DataRequest();
    dataRequest.Procedure = "GetUsers";
    dataRequest.Parameters = JSON.stringify(criteria);

    this._dataService.ExecuteRequest(dataRequest)
      .subscribe(
        result => {
          let resultSet: User[] = result as User[];

          if (resultSet && resultSet.length > 0) {
            this.User = resultSet[0] as User;
          }
        },
        error => {
          console.error(error)
        });
  }

  public ValidateSaveData(): boolean {
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
  }

  public SaveData() {
    this._dataService.ChangePassword(this.User)
      .subscribe(
        result => {
          //check if return type is dataerror
          //create dataerror dataobject for internal validation error message
          let resultSet: User[] = result as User[];

          if (resultSet && resultSet.length > 0) {
            this.User = resultSet[0];
          }
        },
        error => {
          console.error(error)
        });
  }
}
