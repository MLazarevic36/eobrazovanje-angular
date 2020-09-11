import { ExamRegistration } from './../model/exams/exam-registration';
import { Term } from './../model/exams/term';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Exam } from '../model/exams/exam';

@Injectable({
	providedIn: 'root'
  })
export class ExamsService {

	constructor(private http: HttpClient) { }

	getTerms(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'terms');
	}

	getStudentsTerms(id): Observable<Term[]> {
		return this.http.get<Term[]>(environment.apiUrl + 'students/' + id + '/terms');
	}

	registerExam(examRegistration: ExamRegistration): Observable<ExamRegistration>{
		return this.http.post<ExamRegistration>(environment.apiUrl + 'exam-registrations', examRegistration);
	}

	getExam(id): Observable<Exam> {
		return this.http.get<Exam>(environment.apiUrl + 'exams/' + id);
	}

}
