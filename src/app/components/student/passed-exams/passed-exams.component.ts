import { ExamsService } from './../../../services/exams.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-passed-exams',
  templateUrl: './passed-exams.component.html',
  styleUrls: ['./passed-exams.component.css']
})
export class PassedExamsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	exams;

	response: DataTablesResponse;

	constructor(
		private examsService: ExamsService
	) { }

	ngOnInit(): void {
		this.getExams();
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

	getExams(): void {
		const studentId = localStorage.getItem('student_id');
		this.examsService.getStudentsPassedExams(studentId).subscribe((examsList: DataTablesResponse) => {
			this.exams = examsList.content;
			this.response = examsList;
		});
	}


}
