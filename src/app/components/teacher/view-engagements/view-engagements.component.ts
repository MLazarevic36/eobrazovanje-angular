import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TeachersService } from './../../../services/teachers.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-engagements',
  templateUrl: './view-engagements.component.html',
  styleUrls: ['./view-engagements.component.css']
})
export class ViewEngagementsComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	engagements;
	response: DataTablesResponse;

	constructor(
		private teachersService: TeachersService,
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.getEngagements();
		this.dtOptions = {
			paging: true,
			lengthChange: false,
			pagingType: 'full_numbers',
			pageLength: this.response.totalPages,
		};
	}

	getEngagements(): void {
		const teacherId = localStorage.getItem('teacher_id');
		this.teachersService.getTeacherEngagements(teacherId).subscribe((engagementsList: DataTablesResponse) => {
			this.engagements = engagementsList.content;
			this.response = engagementsList;
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	redirect(id): void {
		this.router.navigate(['course', id]);

	}

}
