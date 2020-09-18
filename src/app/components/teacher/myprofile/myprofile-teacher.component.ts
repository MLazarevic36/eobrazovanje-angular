import { Teacher } from './../../../model/teacher';
import { User } from './../../../model/user/user';
import { TeachersService } from './../../../services/teachers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile-teacher',
  templateUrl: './myprofile-teacher.component.html',
  styleUrls: ['./myprofile-teacher.component.css']
})
export class MyprofileTeacherComponent implements OnInit {

	editMode = false;
	teacherId;
	firstName;
	lastName;
	username;
	password;
	role;

	constructor(
		private teachersService: TeachersService
	) { }

	ngOnInit(): void {
		this.getTeacher();
	}

	getTeacher(): void {
		this.teacherId = localStorage.getItem('teacher_id');
		this.teachersService.getTeacher(this.teacherId).subscribe(res => {
			this.firstName = res.first_name;
			this.lastName = res.last_name;
			this.username = res.user.username;
			this.password = res.user.password;
			this.role = res.user.role;
		});
	}

	changeEditMode() {
		this.editMode = !this.editMode;
	}

	submitTeacher() {
		let currentUserObject = JSON.parse(localStorage.getItem('currentUser'));
		var newUsername = ((document.getElementById('usernameInput') as HTMLInputElement).value);
		var newPassword = ((document.getElementById('passwordInput') as HTMLInputElement).value);
		var newFirstName = ((document.getElementById('firstNameInput') as HTMLInputElement).value);
		var newLastName = ((document.getElementById('lastNameInput') as HTMLInputElement).value);

		const updatedUser: User = {
			id: currentUserObject.id,
			username: newUsername,
			password: newPassword,
			role: this.role,
			deleted: false,
			accessToken: null
		};

		const teacher: Teacher = {
			teacher_id: this.teacherId,
			first_name: newFirstName,
			last_name: newLastName,
			user: updatedUser,
			deleted: false,
		};

		this.teachersService.updateTeacher(teacher).subscribe(res => {
			alert('Succesfully updated your data!');
			this.editMode = !this.editMode;
			this.getTeacher();
		});
	}

}
