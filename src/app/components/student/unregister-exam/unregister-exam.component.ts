import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { ExamsService } from './../../../services/exams.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-unregister-exam',
  templateUrl: './unregister-exam.component.html',
  styleUrls: ['./unregister-exam.component.css']
})
export class UnregisterExamComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();


	registrations;
	response: DataTablesResponse;


	constructor(
		private examService: ExamsService
	) { }

	ngOnInit(): void {
		this.getRegistrations();
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

	getRegistrations(): void {
		const studentId = localStorage.getItem('student_id');
		this.examService.getStudentsExamRegistrations(studentId).subscribe((registrationsList: DataTablesResponse) => {
			this.registrations = registrationsList.content;
			this.response = registrationsList;
		});
	}

	unregister(id): void {
		this.examService.unregisterExam(id).subscribe(res => {
			alert('Succesfully unregistered exam!');
			this.rerender();
		});
	}

	rerender(): void {
		const studentId = localStorage.getItem('student_id');
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.examService.getStudentsExamRegistrations(studentId).subscribe((registrationsList: DataTablesResponse) => {
				this.registrations = registrationsList.content;
				this.response = registrationsList;
				this.dtTrigger.next();
			});
		});
	}

}
