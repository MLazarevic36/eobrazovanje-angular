import { Document } from './../model/document';
import { Student } from '../model/student';
import { Term } from '../model/term';
import { AddStudent } from '../model/add_student';
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
		return this.http.delete(environment.apiUrl + 'students/' + id);
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

	getDocuments(id): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'documents/student/' + id);
	}

	deleteDocument(id) {
		return this.http.delete(environment.apiUrl + 'documents/' + id);
	}

	downloadDocument(id): Observable<any> {
		return this.http.get<any>(environment.apiUrl + 'documents/download/' + id,
		{ responseType: 'blob' as 'json'}
		);
	}

	uploadDocument(formData): Observable<any> {
		return this.http.post<any>(environment.apiUrl + 'documents/upload', formData);
	}


}
