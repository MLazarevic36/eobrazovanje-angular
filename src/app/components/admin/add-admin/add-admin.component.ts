import { User } from '../../../model/user/user';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
	addAdminForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	error = '';

	constructor(
		private formBuilder: FormBuilder,
		private usersService: UsersService
	) { }

	ngOnInit(): void {
		this.addAdminForm = this.formBuilder.group({
			username: [''],
			password: ['']
		});
	}

	get f() { return this.addAdminForm.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.addAdminForm.invalid) {
			return;
		}
		this.loading = true;

		const user: User = {
			id: null,
			username: this.f.username.value,
			password: this.f.password.value,
			role: 'ADMIN',
			deleted: false,
			accessToken: null
		};

		this.usersService.createUser(user).subscribe(res => {
			console.log(res);
			this.loading = false;
			this.addAdminForm.reset();
		});
	}
}
