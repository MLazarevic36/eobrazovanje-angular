import { StudentsService } from './../../../services/students.service';
import { TeachersService } from './../../../services/teachers.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-students-admin',
  templateUrl: './students-admin.component.html',
  styleUrls: ['./students-admin.component.css']
})
export class StudentsAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	students;
	response: DataTablesResponse;


	constructor(
		private studentsService: StudentsService,
		private http: HttpClient
	) { }

	ngOnInit(): void {
		this.getStudents();
		this.dtOptions = {
			paging: true,
			lengthChange: false,
			pagingType: 'full_numbers',
			pageLength: this.response.totalPages,

		}
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	getStudents(): void {
		this.studentsService.getStudents().subscribe((studentsList: DataTablesResponse) => {
			this.students = studentsList.content;
			this.response = studentsList;
		});
	}

	handleClick(event: Event) {
		let elementId = (event.target as Element).id;
		this.studentsService.deleteStudent(elementId);
		alert('Succesfully deleted student!');
		this.rerender();
	  }

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.studentsService.getStudents().subscribe((studentsList: DataTablesResponse) => {
				this.students = studentsList.content;
				this.response = studentsList;
				this.dtTrigger.next();
			});
		});
	}

}
