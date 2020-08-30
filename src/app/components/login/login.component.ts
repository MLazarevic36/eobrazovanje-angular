import { AuthService } from './../../services/AuthService/authentication.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	error = '';

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthService
	) {
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});

		// this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';

	}

	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		this.authenticationService.login(this.f.username.value, this.f.password.value)
			.pipe(first())
			.subscribe(
				data => {
					let currentUserObject = JSON.parse(localStorage.getItem('currentUser'));
					if (currentUserObject.role === 'ADMIN') {
						this.router.navigateByUrl('/admin');
					}else if (currentUserObject.role === 'STUDENT') {
						this.router.navigateByUrl('/student');
					}else{
						this.router.navigateByUrl('/teacher');
					}
				}
				,
				error => {
					this.error = error;
					this.loading = false;
				});


	}

}
