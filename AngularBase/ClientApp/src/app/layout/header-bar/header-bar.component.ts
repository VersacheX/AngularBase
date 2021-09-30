import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  constructor(@Inject(AuthenticationService) private _authenticationService: AuthenticationService) { }

  private _dropdownMenuOpen: boolean = false;

  ngOnInit() {
  }

  ToggleDropDownMenu() {
    this._dropdownMenuOpen = !this._dropdownMenuOpen;
  }

  CloseDropDownMenu() {
    this._dropdownMenuOpen = false;
  }

  LogOut() {
    this._authenticationService.LogOut();
  }
}
