import { TeacherEngagement } from './../../../model/teacher-engagement';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { CoursesService } from './../../../services/courses.service';
import { User } from './../../../model/user/user';
import { UsersService } from './../../../services/users.service';
import { TeachersService } from './../../../services/teachers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
	@ViewChild('myDiv') myDiv: ElementRef;

	addTeacherForm: FormGroup;
	loading = false;
	submitted = false;
	courses;
	engagements = [];

	constructor(
		private formBuilder: FormBuilder,
		private teachersService: TeachersService,
		private usersService: UsersService,
		private coursesService: CoursesService
	) { }

	ngOnInit(): void {
		this.getCourses();
		this.addTeacherForm = this.formBuilder.group({
			username: [''],
			password: [''],
			firstName: [''],
			lastName: [''],
			courseId: [''],
			teacherRole: ['']
		});
	}

	getCourses(): void {
		this.coursesService.getCourses().subscribe((coursesList: DataTablesResponse) => {
			this.courses = coursesList.content;
		});
	}

	get f() { return this.addTeacherForm.controls; }

	handleClick() {
		this.engagements.push({ course: this.f.courseId.value,
								role: this.f.teacherRole.value});
		console.log(this.engagements);
	}

	handleDelete() {
		var removeIndex = this.engagements.map(function(item) {return item.courseName; }).indexOf(1);
		this.engagements.splice(removeIndex, 1);

	}


	onSubmit() {
		this.submitted = true;
		this.loading = true;

		const user: User = {
			id: null,
			username: this.f.username.value,
			password: this.f.password.value,
			role: 'TEACHER',
			deleted: false,
			accessToken: null
		};

		this.usersService.createUser(user).subscribe(res => {
			const newUser: User = {
				id: res.id,
				username: res.username,
				password: res.password,
				role: res.role,
				deleted: res.deleted,
				accessToken: res.accessToken
			};
			const teacher: Teacher = {
				teacher_id: null,
				first_name: this.f.firstName.value,
				last_name: this.f.lastName.value,
				user: newUser,
				deleted: false
			};
			this.teachersService.createTeacher(teacher).subscribe(resTeacher => {

				for (var obj of this.engagements) {
					const teacherEngagement: TeacherEngagement = {
						teacher_engagement_id: null,
						course: { course_id: obj.course},
						teacher: { teacher_id: resTeacher.teacher_id},
						teacher_role: obj.role,
						deleted: false
					};
					this.teachersService.createTeacherEngagement(teacherEngagement).subscribe(resEngagement => {
						this.loading = false;
						this.addTeacherForm.reset();
						this.engagements = [];
					});
				}
			});
		});
	}

}
