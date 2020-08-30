import { AuthService } from './../../services/AuthService/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../model/user/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	currentUser: User;

	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {
		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

	}

	ngOnInit(): void {
	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/']);
	}

}
