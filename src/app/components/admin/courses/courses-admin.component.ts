import { CoursesService } from './../../../services/courses.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { UsersService } from './../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.css']
})
export class CoursesAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	courses;
	response: DataTablesResponse;

	constructor(
		private coursesService: CoursesService,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.getCourses();
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

	getCourses(): void {
		this.coursesService.getCourses().subscribe((coursesList: DataTablesResponse) => {
			this.courses = coursesList.content;
			this.response = coursesList;
		});
	}

	handleClick(id) {
		this.coursesService.deleteCourse(id).subscribe(res => {
			alert('Succesfully deleted course!');
			this.rerender();
		});
	  }

	rerender(): void {
	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
		dtInstance.destroy();
		this.coursesService.getCourses().subscribe((coursesList: DataTablesResponse) => {
			this.courses = coursesList.content;
			this.response = coursesList;
			this.dtTrigger.next();
		});


	});

	}

}
