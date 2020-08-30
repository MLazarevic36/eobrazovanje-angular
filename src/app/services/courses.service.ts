import { CourseEnrollment } from './../model/course-enrollment';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
  })
export class CoursesService {

	constructor(private http: HttpClient) { }

	getCourses(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'courses');
	}

	deleteCourse(id) {
		return this.http.delete(environment.apiUrl + 'courses/' + id).subscribe(data => {
		});
	}

	createCourseEnrollment(courseEnrollment: CourseEnrollment): Observable<CourseEnrollment> {
		return this.http.post<CourseEnrollment>(environment.apiUrl + 'course-enrollments', courseEnrollment);
	}
}
