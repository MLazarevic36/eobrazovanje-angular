import { TeachersService } from './../../../services/teachers.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-engagements-admin',
  templateUrl: './engagements-admin.component.html',
  styleUrls: ['./engagements-admin.component.css']
})
export class EngagementsAdminComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
  	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	engagements;
	response: DataTablesResponse;

	constructor(
		private teacherService: TeachersService
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


	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	getEngagements(): void {
		this.teacherService.getEngagements().subscribe((engagementsList: DataTablesResponse) => {
			this.engagements = engagementsList.content;
			this.response = engagementsList;
		});
	}

	remove(id) {
		this.teacherService.deleteEngagement(id).subscribe(res => {
			alert('Succesfully deleted engagement!');
			this.rerender();
		});

	  }

	rerender(): void {
	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
		dtInstance.destroy();
		this.teacherService.getEngagements().subscribe((engagementsList: DataTablesResponse) => {
			this.engagements = engagementsList.content;
			this.response = engagementsList;
			this.dtTrigger.next();
		});



	});

}


}
