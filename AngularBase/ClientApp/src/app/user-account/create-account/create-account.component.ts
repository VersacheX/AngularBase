import { Component, Inject, OnInit } from '@angular/core';

import { DataRequest, SecurityQuestionType, User } from '../../_dataObjects';
import { DataService } from '../../_services/data-service';
import { DetailComponent } from '../../_controls/detail-component.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent extends DetailComponent implements OnInit  {
  constructor(@Inject(DataService) private _dataService: DataService,
              public Route: ActivatedRoute) {
    super(Route);

    this.User = new User();
  }

  public get User(): User {
    return this.BusinessObject as User;
  }
  public set User(user: User) {
    this.BusinessObject = user;
  }

  public BusinessObjectId: number;

  public SecurityQuestionTypes: SecurityQuestionType[];

  ngOnInit() {
    this.Load();
  }

  public LoadControlsData() {
    let criteria = { };

    let dataRequest: DataRequest = new DataRequest();
    dataRequest.Procedure = "GetSecurityQuestionTypes";
    dataRequest.Parameters = JSON.stringify(criteria);

    this._dataService.NoAuthExecuteRequest(dataRequest)
      .subscribe(
        result => {
          this.SecurityQuestionTypes = result as SecurityQuestionType[];
        },
        error => {
          console.error(error)
        });
  }

  public CreateData() {
  }

  public ValidateSaveData(): boolean {
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
  }

  public SaveData() {
    this._dataService.CreateAccount(this.User)
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
