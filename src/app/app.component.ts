import { AuthService } from './services/AuthService/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	currentUser: User;


	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {
		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/']);
	}


}
