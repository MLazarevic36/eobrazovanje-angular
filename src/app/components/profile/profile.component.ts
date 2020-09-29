import { Student } from './../../model/student';
import { Teacher } from 'src/app/model/teacher';
import { User } from 'src/app/model/user';
import { UsersService } from './../../services/users.service';
import { StudentsService } from './../../services/students.service';
import { TeachersService } from './../../services/teachers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	editMode = false;
	role;
	id;
	teacherId;
	studentId;
	firstName;
	lastName;
	username;
	password;
	indexNumber;
	accountBalance;


	constructor(
		private teachersService: TeachersService,
		private studentsService: StudentsService,
		private usersService: UsersService
	) { }

	ngOnInit(): void {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		this.role = user.role;
		this.id = user.id;
		if (user.role === 'TEACHER') {
			this.getTeacher();
		}else if (user.role === 'STUDENT') {
			this.getStudent();
		}else if (user.role === 'ADMIN') {
			this.getUser();
		}
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

	getStudent(): void {
		this.studentId = localStorage.getItem('student_id');
		this.studentsService.getStudent(this.studentId).subscribe(res => {
			this.firstName = res.first_name;
			this.lastName = res.last_name;
			this.indexNumber = res.index_number;
			this.accountBalance = res.account_balance;
			this.username = res.user.username;
			this.password = res.user.password;
			this.role = res.user.role;
		});
	}

	getUser(): void {
		this.usersService.getUser(this.id).subscribe(res => {
			this.username = res.username;
			this.password = res.password;
		});
	}

	changeEditMode() {
		this.editMode = !this.editMode;
	}

	submit() {

		if (this.role === 'TEACHER') {
			var newUsername = ((document.getElementById('usernameInput') as HTMLInputElement).value);
			var newPassword = ((document.getElementById('passwordInput') as HTMLInputElement).value);
			var newFirstName = ((document.getElementById('firstNameInput') as HTMLInputElement).value);
			var newLastName = ((document.getElementById('lastNameInput') as HTMLInputElement).value);
			const updatedUser: User = {
				id: this.id,
				username: newUsername,
				password: newPassword,
				role: this.role,
				deleted: false,
				accessToken: null
			};
			const teacher: Teacher = {
				id: this.teacherId,
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
		}else if (this.role === 'STUDENT') {
			var newUsername = ((document.getElementById('usernameInput') as HTMLInputElement).value);
			var newPassword = ((document.getElementById('passwordInput') as HTMLInputElement).value);
			var newFirstName = ((document.getElementById('firstNameInput') as HTMLInputElement).value);
			var newLastName = ((document.getElementById('lastNameInput') as HTMLInputElement).value);
			const updatedUser: User = {
				id: this.id,
				username: newUsername,
				password: newPassword,
				role: this.role,
				deleted: false,
				accessToken: null
			};
			const updatedStudent: Student = {
				id: this.studentId,
				first_name: newFirstName,
				last_name: newLastName,
				index_number: this.indexNumber,
				account_balance: this.accountBalance,
				user: updatedUser,
				deleted: false
			};
			this.studentsService.updateStudent(updatedStudent).subscribe(res => {
				alert('Succesfully updated your data!');
				this.editMode = !this.editMode;
				this.getStudent();
			});
		}else if (this.role === 'ADMIN') {
			var newUsername = ((document.getElementById('usernameInput') as HTMLInputElement).value);
			var newPassword = ((document.getElementById('passwordInput') as HTMLInputElement).value);
			const user: User = {
				id: this.id,
				username: newUsername,
				password: newPassword,
				role: this.role,
				deleted: false,
				accessToken: null
			};
			this.usersService.updateUser(user).subscribe(res => {
				alert('Succesfully updated your data!');
				this.editMode = !this.editMode;
				this.getUser();
			});
		}
	}
}
