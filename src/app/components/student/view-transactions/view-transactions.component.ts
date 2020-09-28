import { HttpClient } from '@angular/common/http';
import { StudentsService } from './../../../services/students.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	transactions;
	response: DataTablesResponse;

	constructor(
		private studentsService: StudentsService
	) { }

	ngOnInit(): void {
		this.getTransactions();
		this.dtOptions = {
			paging: true,
			lengthChange: false,
			pagingType: 'full_numbers',
			pageLength: this.response.totalPages,
		};
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	getTransactions(): void {
		const studentId = localStorage.getItem('student_id');
		this.studentsService.getStudentTransactions(studentId).subscribe((transactionsList: DataTablesResponse) => {
			this.transactions = transactionsList.content;
			this.response = transactionsList;
		});
	}

}
