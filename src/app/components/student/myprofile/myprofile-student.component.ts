import { Student } from './../../../model/student/student';
import { User } from './../../../model/user/user';
import { StudentsService } from './../../../services/students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile-student',
  templateUrl: './myprofile-student.component.html',
  styleUrls: ['./myprofile-student.component.css']
})
export class MyprofileStudentComponent implements OnInit {

	editMode = false;
	studentId;
	firstName;
	lastName;
	indexNumber;
	accountBalance;
	username;
	password;
	role;

	constructor(
		private studentService: StudentsService
	) { }

	ngOnInit(): void {
		this.getStudent();
	}

	getStudent(): void {
		this.studentId = localStorage.getItem('student_id');
		this.studentService.getStudent(this.studentId).subscribe(res => {
			this.firstName = res.first_name;
			this.lastName = res.last_name;
			this.indexNumber = res.index_number;
			this.accountBalance = res.account_balance;
			this.username = res.user.username;
			this.password = res.user.password;
			this.role = res.user.role;
		});
	}

	changeEditMode() {
		this.editMode = !this.editMode;
	}

	submitStudent() {

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

		const updatedStudent: Student = {
			student_id: this.studentId,
			first_name: newFirstName,
			last_name: newLastName,
			index_number: this.indexNumber,
			account_balance: this.accountBalance,
			user: updatedUser,
			deleted: false
		};

		this.studentService.updateStudent(updatedStudent).subscribe(res => {
			alert('Succesfully updated your data!');
			this.editMode = !this.editMode;
			this.getStudent();
		});

	}

}
