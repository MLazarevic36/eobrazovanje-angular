import { TransactionsService } from './../../../services/transactions.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-transactions-admin',
  templateUrl: './transactions-admin.component.html',
  styleUrls: ['./transactions-admin.component.css']
})
export class TransactionsAdminComponent implements OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	transactions;
	response: DataTablesResponse;

	constructor(
		private transactionsService: TransactionsService
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
		this.transactionsService.getTransactions().subscribe((transactionsList: DataTablesResponse) => {
			this.transactions = transactionsList.content;
			this.response = transactionsList;
		});
	}

}
