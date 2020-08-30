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

			// columns: [{data: 'id'}, {data: 'username'}, {data: 'role'}]

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


}
