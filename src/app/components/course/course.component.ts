import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { DataTablesResponse } from './../../model/data-tables-response';
import { CourseEnrollmentIndex } from './../../model/course-enrollment-index';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	show = false;
	addStudentForm: FormGroup;
	courseName;
	courseId;
	enrollments;
	role;
	response: DataTablesResponse;

	constructor(
		private route: ActivatedRoute,
		private courseService: CoursesService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.courseId = this.route.snapshot.paramMap.get('id');
		const user = JSON.parse(localStorage.getItem('currentUser'));
		this.role = user.role;
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
			id: null,
			course: { id: this.courseId},
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
