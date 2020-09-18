import { CourseEnrollmentIndex } from './../../../model/course-enrollment-index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { CoursesService } from './../../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-detailed-course',
  templateUrl: './view-detailed-course.component.html',
  styleUrls: ['./view-detailed-course.component.css']
})
export class ViewDetailedCourseComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	show = false;
	addStudentForm: FormGroup;
	courseName;
	courseId;
	enrollments;
	response: DataTablesResponse;

	constructor(
		private route: ActivatedRoute,
		private courseService: CoursesService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.courseId = this.route.snapshot.paramMap.get('id');
		this.getCourse(this.courseId);
		this.getCourseEnrollments(this.courseId);
		this.addStudentForm = this.formBuilder.group({
			studentIndexNumber: ['']
		});
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

	get f() { return this.addStudentForm.controls; }

	showForm() {
		this.show = !this.show;
	}

	submitStudent() {

		const enrollment: CourseEnrollmentIndex = {
			course_enrollment_id: null,
			course: { course_id: this.courseId},
			index_number: this.f.studentIndexNumber.value,
			deleted: false
		};
		this.courseService.createCourseEnrollmentWithIndex(enrollment).subscribe(res => {
			alert('Succesfully added student!');
			this.rerender();
			this.addStudentForm.reset();
			this.showForm();
		});
	}

	cancelAdd() {
		this.addStudentForm.reset();
		this.showForm();
	}

	removeEnrollment(id) {
		this.courseService.removeCourseEnrollment(id).subscribe(res => {
			alert('Succesfully deleted student from course!');
			this.rerender();
		});
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.courseService.getCourseEnrollments(this.courseId).subscribe((coursesList: DataTablesResponse) => {
				this.enrollments = coursesList.content;
				this.response = coursesList;
				this.dtTrigger.next();
			});
		});
	}

}
