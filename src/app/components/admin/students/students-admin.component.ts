import { User } from '../../../model/user';
import { Student } from '../../../model/student';
import { AddStudent } from '../../../model/add_student';
import { StudentsService } from './../../../services/students.service';
import { TeachersService } from './../../../services/teachers.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-students-admin',
  templateUrl: './students-admin.component.html',
  styleUrls: ['./students-admin.component.css']
})
export class StudentsAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	students;
	studentId;
	userId;
	firstName;
	lastName;
	indexNumber;
	accountBalance;
	username;
	password;
	role;
	show = false;

	response: DataTablesResponse;
	totalPages;


	constructor(
		private studentsService: StudentsService,
	) { }

	ngOnInit(): void {
		this.getStudents();
		this.dtOptions = {
			paging: true,
			lengthChange: false,
			pagingType: 'full_numbers',
			pageLength: this.response.totalPages,
			stateSave: false
		};
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	getStudents(): void {
		this.studentsService.getStudents().subscribe((studentsList: DataTablesResponse) => {
			this.students = studentsList.content;
			this.response = studentsList;
		});
	}

	handleDelete(id) {
		this.studentsService.deleteStudent(id).subscribe(res => {
			alert('Succesfully deleted student!');
			this.rerender();
		});

	  }

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.studentsService.getStudents().subscribe((studentsList: DataTablesResponse) => {
				this.students = studentsList.content;
				this.response = studentsList;
				this.dtTrigger.next();
			});
		});
	}

	handleUpdate(currentStudentId, currentFirstName, currentLastName, currentIndexNumber, currentAccountBalance,
		currentUserId, currentUsername, currentPassword, currentRole) {
		this.studentId = currentStudentId;
		this.firstName = currentFirstName;
		this.lastName = currentLastName;
		this.indexNumber = currentIndexNumber;
		this.accountBalance = currentAccountBalance;
		this.userId = currentUserId;
		this.username = currentUsername;
		this.password = currentPassword;
		this.role = currentRole;
		this.show = !this.show;
	}

	handleCancel() {
		this.show = !this.show;
	}

	updateStudent() {
		var newFirstName = ((document.getElementById('firstNameInput') as HTMLInputElement).value);
		var newLastName = ((document.getElementById('lastNameInput') as HTMLInputElement).value);
		var newIndexNumber = ((document.getElementById('indexNumberInput') as HTMLInputElement).value);
		var newAccountBalance = ((document.getElementById('accountBalanceInput') as HTMLInputElement).value);

		const updatedUser: User = {
			id: this.userId,
			username: this.username,
			password: this.password,
			role: this.role,
			deleted: false,
			accessToken: null
		}

		const updatedStudent: Student = {
			id: this.studentId,
			first_name: newFirstName,
			last_name: newLastName,
			index_number: newIndexNumber,
			account_balance: Number(newAccountBalance),
			user: updatedUser,
			deleted: false
		}

		this.studentsService.updateStudent(updatedStudent).subscribe(res => {
			alert('Succesfully updated students data!');
			this.rerender();
			this.show = !this.show;
		});

	}

}
