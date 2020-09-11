import { DataTablesResponse } from './../../../model/data-tables-response';
import { CoursesService } from './../../../services/courses.service';
import { User } from 'src/app/model/user/user';
import { map } from 'rxjs/operators';
import { AddStudent } from './../../../model/student/add_student';
import { StudentsService } from './../../../services/students.service';
import { UsersService } from './../../../services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CourseEnrollment } from 'src/app/model/course-enrollment';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
	addStudentForm: FormGroup;
	loading = false;
	submitted = false;
	courses;



	constructor(
		private formBuilder: FormBuilder,
		private usersService: UsersService,
		private studentsService: StudentsService,
		private coursesService: CoursesService
	) { }

	ngOnInit(): void {
		this.getCourses();
		this.addStudentForm = this.formBuilder.group({
			username: [''],
			password: [''],
			firstName: [''],
			lastName: [''],
			indexNumber: [''],
			courseIds: ['']
		});
	}

	getCourses(): void {
		this.coursesService.getCourses().subscribe((coursesList: DataTablesResponse) => {
			this.courses = coursesList.content;
		});
	}


	get f() { return this.addStudentForm.controls; }

	onSubmit() {
		this.submitted = true;
		this.loading = true;

		const user: User = {
			id: null,
			username: this.f.username.value,
			password: this.f.password.value,
			role: 'STUDENT',
			deleted: false,
			accessToken: null
		};

		console.log(this.f.courseIds.value);

		this.usersService.createUser(user).subscribe(res => {
			const student: AddStudent = {
				student_id: null,
				first_name: this.f.firstName.value,
				last_name: this.f.lastName.value,
				index_number: this.f.indexNumber.value,
				account_balance: 1000.0,
				user: {
					id : Number(res.id)
				},
				deleted: false
			};
			this.studentsService.createStudent(student).subscribe(resStudent => {
				for (var val of this.f.courseIds.value) {
					const enrollment: CourseEnrollment = {
						course_enrollment_id: null,
						student: { student_id: resStudent.student_id},
						course: { course_id: val},
						deleted: false
					};
					this.coursesService.createCourseEnrollment(enrollment).subscribe(resEnrollment => {
						this.loading = false;
						this.addStudentForm.reset();
						console.log(resEnrollment);
					});
				}
			});
		});

	}
}
