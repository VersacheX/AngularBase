import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_dataObjects';
import { DataService } from '../../_services/data-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit  {
  public User: User;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              @Inject(DataService) private _dataService: DataService) { }

  //Need to pass in a Username to this component.  the username will be used to grab the security questions. only grab the questions and the username.
  //the answers will be posted with the username to determine if password reset is ok.
  //e-mail will be sent with the temporary password

  ngOnInit() {
    this.GetData();
  }

  private GetData() {
    this.User = new User();
    this.User.Username = this._activatedRoute.snapshot.paramMap.get('username');

    if (this.User.Username && this.User.Username.trim().length > 0) {
      this._dataService.GetUserSecurityQuestions(this.User)
        .subscribe(
          result => {
            this.User = result as User;
          },
          error => {
            console.error(error)
          });
    }
    else {
      this._router.navigate(['/login/']);
    }
  }

  ResetPassword() {
    this._dataService.ResetPassword(this.User)
      .subscribe(
        result => {
          //let resultSet: User = ;

          //if (resultSet && resultSet.length > 0) {
            //Display Message "A temporary password has been sent to the e-mail on file"
            this.User = result as User;//resultSet[0] as User;
          //}
        },
        error => {
          console.error(error)
        });
  }
}
