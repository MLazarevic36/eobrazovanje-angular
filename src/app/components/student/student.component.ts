import { Student } from '../../model/student';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from './../../services/students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

	constructor(
		private studentsService: StudentsService,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.getStudentId();
	}

	getStudentId(): void {
	let currentUserObject = JSON.parse(localStorage.getItem('currentUser'));

	this.studentsService.getStudentByUser(currentUserObject.id).subscribe((student: Student) => {
		localStorage.setItem('student_id', student.id.toString());
	});
	}

}
