import { Component, Inject, OnInit } from '@angular/core';

import { DataRequest, User } from '../../_dataObjects';
import { DataService } from '../../_services/data-service';
import { DetailComponent } from '../../_controls/detail-component.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html'
})
export class ActivateAccountComponent implements OnInit  {
  constructor(@Inject(DataService) private _dataService: DataService,
    public Route: ActivatedRoute) {

    this.User = new User;
  }

  public User: User;

  ngOnInit() {
    this.User.ActivationCode = this.Route.snapshot.paramMap.get('activationcode');
  }
}
