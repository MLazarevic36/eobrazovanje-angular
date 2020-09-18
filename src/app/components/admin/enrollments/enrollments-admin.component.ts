import { CoursesService } from './../../../services/courses.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-enrollments-admin',
  templateUrl: './enrollments-admin.component.html',
  styleUrls: ['./enrollments-admin.component.css']
})
export class EnrollmentsAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	enrollments;
	response: DataTablesResponse;

	constructor(
		private courseService: CoursesService
	) { }

	ngOnInit(): void {
		this.getEnrollments();
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

	getEnrollments(): void {
		this.courseService.getAllCourseEnrollments().subscribe((enrollmentsList: DataTablesResponse) => {
			this.enrollments = enrollmentsList.content;
			this.response = enrollmentsList;
		});
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.courseService.getAllCourseEnrollments().subscribe((enrollmentsList: DataTablesResponse) => {
				this.enrollments = enrollmentsList.content;
				this.response = enrollmentsList;
				this.dtTrigger.next();
			});
		});
	}

	remove(id) {
		this.courseService.removeCourseEnrollment(id).subscribe(res => {
			alert('Succesfully deleted enrollment!');
			this.rerender();
		});
	}


}
