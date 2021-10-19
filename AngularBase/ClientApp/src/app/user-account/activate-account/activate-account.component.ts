import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../_dataObjects';
import { DataService } from '../../_services/data-service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html'
})
export class ActivateAccountComponent implements OnInit  {
  constructor(@Inject(DataService) private _dataService: DataService,
              public Route: ActivatedRoute,
              private _router: Router,  ) {

    this.User = new User;
  }

  public User: User;

  ngOnInit() {
    this.User.ActivationCode = this.Route.snapshot.paramMap.get('activationcode');

    this._dataService.ActivateAccount(this.User)
      .subscribe(
        result => {
          //check if return type is dataerror
          //create dataerror dataobject for internal validation error message
          let resultSet: User[] = result as User[];

          if (resultSet && resultSet.length > 0) {
            this.User = resultSet[0];

            //display success message
            this._router.navigate(['/login/']);
          }
        },
        error => {
          //display fail message         
          this._router.navigate(['/login/']);
          console.error(error)
        });
  }
}
