import { AuthService } from './../services/AuthService/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authenticationService.currentUserValue;
		if (currentUser) {
			return true;
		}

		this.router.navigate([''], { queryParams: {returnUrl: state.url}});
		return false;
	}
}
