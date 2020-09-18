import { CourseEnrollmentIndex } from './../model/course-enrollment-index';
import { CourseEnrollment } from './../model/course-enrollment';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
	providedIn: 'root'
  })
export class CoursesService {

	constructor(private http: HttpClient) { }

	getCourses(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'courses');
	}

	createCourseEnrollment(courseEnrollment: CourseEnrollment): Observable<CourseEnrollment> {
		return this.http.post<CourseEnrollment>(environment.apiUrl + 'course-enrollments', courseEnrollment);
	}

	createCourseEnrollmentWithIndex(courseEnrollment: CourseEnrollmentIndex): Observable<CourseEnrollmentIndex>{
		return this.http.post<CourseEnrollmentIndex>(environment.apiUrl + 'course-enrollments/index-number', courseEnrollment);
	}

	getCourse(id): Observable<Course>{
		return this.http.get<Course>(environment.apiUrl + 'courses/' + id);
	}

	getCourseEnrollments(id): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'course-enrollments/course/' + id);
	}

	getAllCourseEnrollments(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'course-enrollments');
	}

	deleteCourse(id) {
		return this.http.delete(environment.apiUrl + 'courses/' + id);
	}

	removeCourseEnrollment(id) {
		return this.http.delete(environment.apiUrl + 'course-enrollments/' + id);
	}

}
