import { User } from './../../../model/user/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { UsersService } from './../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	users;
	userId;
	username;
	password;
	role;
	show = false;
	response: DataTablesResponse;

	constructor(
		private usersService: UsersService,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.getUsers();
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

	getUsers(): void {
		this.usersService.getUsers().subscribe((usersList: DataTablesResponse) => {
			this.users = usersList.content;
			this.response = usersList;
		});
	}

	handleClick(event: Event) {
		let elementId = (event.target as Element).id;
		this.usersService.deleteUser(elementId);
		alert('Succesfully deleted user!');
		this.rerender();
	  }

	handleUpdate(currentUserId, currentUsername, currentPassword, currentUserRole) {
		this.userId = currentUserId;
		this.username = currentUsername;
		this.password = currentPassword;
		this.role = currentUserRole;
		this.show = !this.show;
	}

	updateUser() {
		var newUsername = ((document.getElementById('usernameInput') as HTMLInputElement).value);
		var newPassword = ((document.getElementById('passwordInput') as HTMLInputElement).value);

		const updatedUser: User = {
			id: this.userId,
			username: newUsername,
			password: newPassword,
			role: this.role,
			deleted: false,
			accessToken: null
		};

		this.usersService.updateUser(updatedUser).subscribe(res => {
			alert('Succesfully updated users data!');
			this.rerender();
			this.show = !this.show;
		});
	}

	handleCancel() {
		this.show = !this.show;
	}

	rerender(): void {
	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
		dtInstance.destroy();
		this.usersService.getUsers().subscribe((usersList: DataTablesResponse) => {
			this.users = usersList.content;
			this.response = usersList;
			this.dtTrigger.next();
		});



	});

}
}
