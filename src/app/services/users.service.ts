import { User } from 'src/app/model/user/user';
import { DataTablesResponse } from './../model/data-tables-response';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) { }

	getUsers(): Observable<DataTablesResponse> {
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'users');
	}

	deleteUser(id) {
		return this.http.delete(environment.apiUrl + 'users/' + id).subscribe(data => {
		  });
	}

	createUser(user: User): Observable<User> {
		return this.http.post<User>(environment.apiUrl + 'users', user);
	}



}
