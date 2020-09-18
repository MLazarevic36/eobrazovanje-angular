import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { CoursesService } from './../../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-detailed-course-student',
  templateUrl: './detailed-course-student.component.html',
  styleUrls: ['./detailed-course-student.component.css']
})
export class DetailedCourseStudentComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	courseId;
	courseName;
	enrollments;
	response: DataTablesResponse;

	constructor(
	private route: ActivatedRoute,
	private courseService: CoursesService,
	) { }

	ngOnInit(): void {
		this.courseId = this.route.snapshot.paramMap.get('id');
		this.getCourse(this.courseId);
		this.getCourseEnrollments(this.courseId);
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

	getCourse(id): void {
		this.courseService.getCourse(id).subscribe( res => {
			this.courseName = res.name;
		});
	}

	getCourseEnrollments(id): void {
		this.courseService.getCourseEnrollments(id).subscribe((enrollmentsList: DataTablesResponse) => {
			this.enrollments = enrollmentsList.content;
			this.response = enrollmentsList;
		});
	}

}
