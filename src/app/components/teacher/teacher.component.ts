import { HttpClient } from '@angular/common/http';
import { TeachersService } from './../../services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(
	  private teachersService: TeachersService,
	  private http: HttpClient,
  ) { }

  ngOnInit(): void {
	  this.getTeacherId();
  }

  getTeacherId(): void {
	let currentUserObject = JSON.parse(localStorage.getItem('currentUser'));

	this.teachersService.getTeacherByUser(currentUserObject.id).subscribe((teacher: Teacher) => {
		localStorage.setItem('teacher_id', teacher.teacher_id.toString());
	});
	}

}
