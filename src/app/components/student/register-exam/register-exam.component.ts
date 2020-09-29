import { element } from 'protractor';
import { catchError } from 'rxjs/operators';
import { ExamRegistration } from '../../../model/exam-registration';
import { Exam } from '../../../model/exam';
import { Student } from '../../../model/student';
import { StudentsService } from './../../../services/students.service';
import { Term } from '../../../model/term';
import { ExamsService } from './../../../services/exams.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-register-exam',
  templateUrl: './register-exam.component.html',
  styleUrls: ['./register-exam.component.css']
})
export class RegisterExamComponent implements AfterViewInit, OnDestroy, OnInit  {
	@ViewChildren(DataTableDirective)
  	dtElements: QueryList<DataTableDirective>;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	icon = 'check_box_outline_blank';
	disabled = false;
	terms;
	response: DataTablesResponse;

	constructor(
		private examsService: ExamsService,
		private http: HttpClient,
		private studentsService: StudentsService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.getTerms();
		this.dtOptions = {
			search: true
		};

	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	getTerms(): void {
		const studentId = localStorage.getItem('student_id');
		this.examsService.getStudentsTerms(studentId).subscribe((termsList: Term[]) => {
			this.terms = termsList;
		});
	}

	registerExam(id, event: any): void {
		const studentId = localStorage.getItem('student_id');
		const examRegistration: ExamRegistration = {
			id: null,
			colloquium_points: 0,
			exam_points: 0,
			grade: 5,
			status: 'ACTIVE',
			exam: { id : Number(id)},
			student: { id: Number(studentId)},
			registered: true,
			deleted: false
		};
		console.log(examRegistration);
		this.examsService.registerExam(examRegistration).subscribe(res => {
			alert('Succesfully registered exam!');
			(event.target as HTMLElement).innerText = 'checkbox';
			(event.target as HTMLElement).style.cursor = 'auto';
		});
	}

}
