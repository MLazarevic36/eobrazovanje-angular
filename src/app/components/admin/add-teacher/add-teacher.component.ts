import { TeacherEngagement } from './../../../model/teacher-engagement';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { CoursesService } from './../../../services/courses.service';
import { User } from '../../../model/user';
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
	selectedCourse;
	selectedCourseName;
	selectedRole;
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
			course: [''],
			teacherRole: ['']
		});
	}

	getCourses(): void {
		this.coursesService.getCourses().subscribe((coursesList: DataTablesResponse) => {
			this.courses = coursesList.content;
		});
	}

	get f() { return this.addTeacherForm.controls; }

	courseChange(e) {
		let selectedIndex:number = e.target['selectedIndex'];
		this.selectedCourse = e.target.options[selectedIndex].getAttribute('id');
		this.selectedCourseName = e.target.options[selectedIndex].getAttribute('value');
	}

	roleChange(e) {
		let selectedIndex:number = e.target['selectedIndex'];
		this.selectedRole = e.target.options[selectedIndex].getAttribute('value');
	}

	handleClick() {
		this.engagements.push({	courseId: this.selectedCourse,
								courseName: this.selectedCourseName,
								role: this.selectedRole });
		console.log(this.engagements);
	}

	handleDelete(i) {
		this.engagements.splice(i, 1);

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
				id: null,
				first_name: this.f.firstName.value,
				last_name: this.f.lastName.value,
				user: newUser,
				deleted: false
			};
			this.teachersService.createTeacher(teacher).subscribe(resTeacher => {

				for (var obj of this.engagements) {
					const teacherEngagement: TeacherEngagement = {
						id: null,
						course: { id: obj.courseId},
						teacher: {id: resTeacher.id},
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
