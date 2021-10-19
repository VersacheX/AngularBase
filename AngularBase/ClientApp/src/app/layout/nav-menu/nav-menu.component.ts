import { Component, Inject, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  routerEvent$

  private _currentRouterLocation: string = '';
  public SideBarOpen: boolean = false;

  constructor(@Inject(AuthenticationService) private _authenticationService: AuthenticationService,
              @Inject('BASE_URL') private _baseUrl: string,
    private _router: Router) {

    this.routerEvent$
      = this._router.events
        .subscribe(
          (event: NavigationEvent) => {
            if (event instanceof NavigationStart) {
              this._currentRouterLocation = event.url.substring(1, event.url.length);
            }
          });
  }

  ngOnInit() {
  }

  ToggleSideBar() {
    this.SideBarOpen = !this.SideBarOpen;
  }

  MenuItemSelected() {
    this.CloseSideBar();
  }

  CloseSideBar() {
    this.SideBarOpen = false;
  }

  ToggleSubMenuItem(submenuItemName: string) {
    let element = document.getElementById(submenuItemName);

    if (element.classList.contains('collapse'))
      element.classList.remove('collapse');
    else
      element.classList.add('collapse');
  }
}
