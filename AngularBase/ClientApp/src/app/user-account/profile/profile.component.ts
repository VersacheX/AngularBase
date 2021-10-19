import { Component, Inject, OnInit } from '@angular/core';

import { DataRequest, SecurityQuestionType, User } from '../../_dataObjects';
import { DataService } from '../../_services/data-service';
import { DetailComponent } from '../../_controls/detail-component.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends DetailComponent implements OnInit  {
  constructor(@Inject(DataService) private _dataService: DataService,
              @Inject(AuthenticationService) private _authenticationService: AuthenticationService,
              public Route: ActivatedRoute) {
    super(Route);

    this.User = new User;
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
    this.BusinessObjectId = this._authenticationService.CurrentUserId;

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
            this.User = resultSet[0];
          }
        },
        error => {
          console.error(error)
        });
  }

  public ValidateData(): boolean {
    return true;
  }

  public SaveData() {
    let dataRequest: DataRequest = new DataRequest();
    dataRequest.Procedure = "SaveUser";
    dataRequest.Parameters = JSON.stringify(this.User);

    this._dataService.ExecuteRequest(dataRequest)
      .subscribe(
        result => {
          let resultSet: User[] = result as User[];
        },
        error => {
          console.error(error)
        });
  }
}
