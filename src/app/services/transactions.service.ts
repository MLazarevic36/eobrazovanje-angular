import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { DataTablesResponse } from './../model/data-tables-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
  })
export class TransactionsService {

	constructor(private http: HttpClient) { }

	getTransactions(): Observable<DataTablesResponse>{
		return this.http.get<DataTablesResponse>(environment.apiUrl + 'transactions');
	}

}
