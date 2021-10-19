import { Component, ViewChild, OnInit  } from '@angular/core';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _authenticationService: AuthenticationService) { }

  @ViewChild(NavMenuComponent, { static: false }) private _navigationMenu: NavMenuComponent;

  ngOnInit() {

  }
}
