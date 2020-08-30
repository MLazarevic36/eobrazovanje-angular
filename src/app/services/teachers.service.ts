import { TeacherEngagement } from './../model/teacher-engagement';
import { Teacher } from './../model/teacher';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
  })
export class TeachersService {

	constructor(private http: HttpClient) { }

	getTeachers(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'teachers');
	}

	deleteTeacher(id) {
		return this.http.delete(environment.apiUrl + 'teachers/' + id).subscribe(data => {
		});
	}

	createTeacher(teacher: Teacher): Observable<Teacher> {
		return this.http.post<Teacher>(environment.apiUrl + 'teachers', teacher);
	}

	createTeacherEngagement(teacherEngagement: TeacherEngagement): Observable<TeacherEngagement>{
		return this.http.post<TeacherEngagement>(environment.apiUrl + 'teacher-engagements', teacherEngagement);
	}

}
