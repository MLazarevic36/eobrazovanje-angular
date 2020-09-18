import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from './../../../services/students.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-course-enrollments',
  templateUrl: './view-course-enrollments.component.html',
  styleUrls: ['./view-course-enrollments.component.css']
})
export class ViewCourseEnrollmentsComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	courses;
	response: DataTablesResponse;

	constructor(
		private studentsService: StudentsService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.getCourses();
		this.dtOptions = {
			paging: true,
			lengthChange: false,
			pagingType: 'full_numbers',
			pageLength: this.response.totalPages,
		};
	}

	getCourses(): void {
		const studentId = localStorage.getItem('student_id');
		this.studentsService.getStudentCourses(studentId).subscribe((coursesList: DataTablesResponse) => {
			this.courses = coursesList.content;
			this.response = coursesList;
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	redirect(id): void {
		this.router.navigate(['student/course', id]);
	}



}
