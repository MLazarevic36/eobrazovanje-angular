import { ExamRegistrationGet } from './../model/exams/exam-registration-get';
import { TeacherEngagementGet } from './../model/teacher-engagement-get';
import { TeacherEngagement } from './../model/teacher-engagement';
import { Teacher } from './../model/teacher';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ExamRegistration } from '../model/exams/exam-registration';

@Injectable({
	providedIn: 'root'
  })
export class TeachersService {

	constructor(private http: HttpClient) { }

	getTeachers(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'teachers');
	}

	getEngagements(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'teacher-engagements');
	}

	deleteTeacher(id) {
		return this.http.delete(environment.apiUrl + 'teachers/' + id).subscribe(data => {
		});
	}

	deleteEngagement(id) {
		return this.http.delete(environment.apiUrl + 'teacher-engagements/' + id);
	}

	createTeacher(teacher: Teacher): Observable<Teacher> {
		return this.http.post<Teacher>(environment.apiUrl + 'teachers', teacher);
	}

	createTeacherEngagement(teacherEngagement: TeacherEngagement): Observable<TeacherEngagement>{
		return this.http.post<TeacherEngagement>(environment.apiUrl + 'teacher-engagements', teacherEngagement);
	}

	getTeacherByUser(id): Observable<Teacher>{
		return this.http.get<Teacher>(environment.apiUrl + 'teachers/user/' + id);
	}

	getTeacher(id): Observable<Teacher>{
		return this.http.get<Teacher>(environment.apiUrl + 'teachers/' + id);
	}

	getTeacherEngagements(id): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'teachers/' + id + '/engagements');
	}

	getTeacherEngagementsProfessor(id): Observable<TeacherEngagementGet[]> {
		return this.http.get<TeacherEngagementGet[]>(environment.apiUrl + 'teacher-engagements/professor/' + id );
	}

	getTeacherExams(id): Observable<DataTablesResponse> {
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'teachers/' + id + '/exams');
	}

	updateExam(exam: ExamRegistration): Observable<ExamRegistration> {
		return this.http.put<ExamRegistration>(environment.apiUrl + 'exam-registrations', exam);
	}

	updateTeacher(teacher: Teacher): Observable<Teacher> {
		return this.http.put<Teacher>(environment.apiUrl + 'teachers', teacher);
	}

}
