import { Student } from './../model/student/student';
import { Term } from './../model/exams/term';
import { AddStudent } from './../model/student/add_student';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
  })
export class StudentsService {

	constructor(private http: HttpClient) { }

	getStudents(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'students');
	}

	getStudentByUser(id): Observable<Student>{
		return this.http.get<Student>(environment.apiUrl + 'students/user/' + id);
	}

	getStudent(id): Observable<Student>{
		return this.http.get<Student>(environment.apiUrl + 'students/' + id);
	}

	deleteStudent(id) {
		return this.http.delete(environment.apiUrl + 'students/' + id).subscribe(data => {
		});
	}

	createStudent(student: AddStudent): Observable<AddStudent> {
		return this.http.post<AddStudent>(environment.apiUrl + 'students', student);
	}

	getStudentCourses(id): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'students/' + id + '/enrollments');
	}

	getStudentTransactions(id): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'students/' + id + '/transactions');
	}

	updateStudent(student: Student): Observable<Student> {
		return this.http.put<Student>(environment.apiUrl + 'students', student);
	}


}
