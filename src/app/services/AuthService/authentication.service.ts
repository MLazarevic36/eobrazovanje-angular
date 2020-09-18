import { environment } from './../../../environments/environment';
import { User } from '../../model/user/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable( { providedIn: 'root'})
export class AuthService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private https: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}


	login(username: string, password: string) {
		return this.https.post<any>(environment.apiUrl + 'auth/signin', {username, password})
			.pipe(map(user => {
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.currentUserSubject.next(user);
				return user;
			}));
	}

	logout() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('student_id');
		localStorage.removeItem('teacher_id');
		this.currentUserSubject.next(null);

	}

	getToken() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser != null) {
			return currentUser.token;
		} else {
			return null;
		}
	}
}
