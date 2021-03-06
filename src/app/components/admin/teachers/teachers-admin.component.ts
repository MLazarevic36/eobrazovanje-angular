import { Teacher } from './../../../model/teacher';
import { User } from '../../../model/user';
import { TeachersService } from './../../../services/teachers.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { UsersService } from './../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-teachers-admin',
  templateUrl: './teachers-admin.component.html',
  styleUrls: ['./teachers-admin.component.css']
})
export class TeachersAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	teachers;
	show = false;
	teacherId;
	userId;
	firstName;
	lastName;
	username;
	password;
	role;
	response: DataTablesResponse;


	constructor(
		private teachersService: TeachersService,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.getTeachers();
		this.dtOptions = {
			paging: true,
			lengthChange: false,
			pagingType: 'full_numbers',
			pageLength: this.response.totalPages,
		};

	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	getTeachers(): void {
		this.teachersService.getTeachers().subscribe((teachersList: DataTablesResponse) => {
			this.teachers = teachersList.content;
			this.response = teachersList;
		});
	}

	handleClick(event: Event) {
		let elementId = (event.target as Element).id;
		this.teachersService.deleteTeacher(elementId);
		alert('Succesfully deleted teacher!');
		this.rerender();
	  }

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.teachersService.getTeachers().subscribe((teachersList: DataTablesResponse) => {
				this.teachers = teachersList.content;
				this.response = teachersList;
				this.dtTrigger.next();
			});
		});
	}

	handleUpdate(currentTeacherId, currentFirstName, currentLastName, currentUserId, currentUsername, currentPassword, currentRole) {
		this.teacherId = currentTeacherId;
		this.firstName = currentFirstName;
		this.lastName = currentLastName;
		this.userId = currentUserId;
		this.username = currentUsername;
		this.password = currentPassword;
		this.role = currentRole;
		this.show = !this.show;
	}

	updateTeacher() {
		var newFirstName = ((document.getElementById('firstNameInput') as HTMLInputElement).value);
		var newLastName = ((document.getElementById('lastNameInput') as HTMLInputElement).value);

		const updatedUser: User = {
			id: this.userId,
			username: this.username,
			password: this.password,
			role: this.role,
			deleted: false,
			accessToken: null
		};

		const updatedTeacher: Teacher = {
			id: this.teacherId,
			first_name: newFirstName,
			last_name: newLastName,
			user: updatedUser,
			deleted: false
		};

		this.teachersService.updateTeacher(updatedTeacher).subscribe(res => {
			alert('Succesfully updated teachers data!');
			this.rerender();
			this.show = !this.show;
		});
	}

	handleCancel() {
		this.show = !this.show;
	}


}
