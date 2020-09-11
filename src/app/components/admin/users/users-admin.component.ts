import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { UsersService } from './../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import { User } from 'src/app/model/user/user';
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

			// columns: [{data: 'id'}, {data: 'username'}, {data: 'role'}]

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
			console.log(usersList.content);

		});
	}

	handleClick(event: Event) {
		// console.log(event.srcElement.attributes.id);
		// this.deleteUser();
		let elementId = (event.target as Element).id;
		this.usersService.deleteUser(elementId);
		alert('Succesfully deleted user!');
		this.rerender();
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
