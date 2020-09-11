import { TeacherChooseCourseService } from './../../../services/teacher-choose-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherEngagementGet } from './../../../model/teacher-engagement-get';
import { HttpClient } from '@angular/common/http';
import { TeachersService } from './../../../services/teachers.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exam-administration',
  templateUrl: './exam-administration.component.html',
  styleUrls: ['./exam-administration.component.css']
})
export class ExamAdministrationComponent implements OnInit {

	courses;
	courseId;

	constructor(
		private teachersService: TeachersService,
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router,
		private teachersChooseService: TeacherChooseCourseService

	) { }

	ngOnInit(): void {
		this.getCourses();
	}

	getCourses(): void {
		const teacherId = localStorage.getItem('teacher_id');
		this.teachersService.getTeacherEngagementsProfessor(teacherId).subscribe((coursesList: TeacherEngagementGet[]) => {
			this.courses = coursesList;
		});
	}

	handleClick(event: Event) {
		this.teachersChooseService.setData(this.courseId);
		this.router.navigateByUrl('teacher/update');
	}

	courseChange(event) {
		let selectedIndex:number = event.target['selectedIndex'];
		this.courseId = event.target.options[selectedIndex].getAttribute('id');
	}
}
