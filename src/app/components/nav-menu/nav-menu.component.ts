import { AuthService } from './../../services/AuthService/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
	role: string;
	id: number;
	currentUser: User;

	constructor(public router: Router, private authenticationService: AuthService) {
	this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
	}

	ngOnInit(): void {
	let user = JSON.parse(localStorage.getItem('currentUser'));
	this.role = user.role;
	this.id = user.id;
	}

	logout() {
	this.authenticationService.logout();
	this.router.navigate(['/']);
	}

}
