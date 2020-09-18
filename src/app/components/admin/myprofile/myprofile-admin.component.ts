import { User } from 'src/app/model/user/user';
import { UsersService } from './../../../services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile-admin',
  templateUrl: './myprofile-admin.component.html',
  styleUrls: ['./myprofile-admin.component.css']
})
export class MyprofileAdminComponent implements OnInit {

	editMode = false;
	userId;
	role;
	username;
	password;

	constructor(
		private userService: UsersService
	) { }

	ngOnInit(): void {
		let currentUserObject = JSON.parse(localStorage.getItem('currentUser'));
		this.userId = currentUserObject.id;
		this.role = currentUserObject.role;
		this.getUser(this.userId);
	}

	changeEditMode() {
		this.editMode = !this.editMode;
	}

	getUser(id): void {
		this.userService.getUser(id).subscribe(res => {
			this.username = res.username;
			this.password = res.password;
		});
	}

	submitUser() {

		var newUsername = ((document.getElementById('usernameInput') as HTMLInputElement).value);
		var newPassword = ((document.getElementById('passwordInput') as HTMLInputElement).value);
		const user: User = {
			id: this.userId,
			username: newUsername,
			password: newPassword,
			role: this.role,
			deleted: false,
			accessToken: null
		};

		this.userService.updateUser(user).subscribe(res => {
			alert('Succesfully updated your data!');
			this.editMode = !this.editMode;
			this.getUser(this.userId);
		});
	}

}
