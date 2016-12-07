import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mean-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
	constructor(private _authenticationService: AuthenticationService, private router: Router) {}
}