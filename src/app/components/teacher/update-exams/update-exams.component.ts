import { Student } from './../../../model/student/student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamsService } from './../../../services/exams.service';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ExamRegistration } from './../../../model/exams/exam-registration';
import { TeachersService } from './../../../services/teachers.service';
import { TeacherChooseCourseService } from './../../../services/teacher-choose-service';
import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Exam } from 'src/app/model/exams/exam';

@Component({
  selector: 'app-update-exams',
  templateUrl: './update-exams.component.html',
  styleUrls: ['./update-exams.component.css']
})
export class UpdateExamsComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	show = false;
	data;
	exams;
	registrationId;
	examId;
	studentId;
	response: DataTablesResponse;
	updateExamForm: FormGroup;

	constructor(
		private teacherChooseService: TeacherChooseCourseService,
		private teachersService: TeachersService,
		private examsService: ExamsService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.data = this.teacherChooseService.getData();
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
		var id = this.data;
		this.teachersService.getTeacherExams(id).subscribe((examsList: DataTablesResponse) => {
			this.exams = examsList.content;
		});
	}

	get f() { return this.updateExamForm.controls; }

	handleClick(event: Event, examId, studentId) {
		this.updateExamForm = this.formBuilder.group({
			colloquium_points: [''],
			exam_points: ['']
		});
		this.show = true;
		this.studentId = studentId;
		this.examId = examId;
		this.registrationId = (event.target as Element).id;



		// this.updateExamForm.setValue({
		// 	index_number: '3',
		// 	course: 'kurs',
		// 	colloquium_points: 3,
		// 	exam_points: '3'
		// });
		// this.f.index_number.setValue('sf22');

	}

	handleCancel() {
		this.show = false;
	}

	handleSubmit() {

		const updatedExam: ExamRegistration = {
			exam_registration_id: Number(this.registrationId),
			colloquium_points: this.f.colloquium_points.value,
			exam_points: this.f.exam_points.value,
			grade: 0,
			status: 'PASSED',
			exam: { exam_id : Number(this.examId)},
			student: { student_id : Number(this.studentId)},
			registered: false,
			deleted: false
		};

		this.teachersService.updateExam(updatedExam).subscribe(res => {
			alert('Succesfully updated exam');
			this.rerender();
		});

	}

	rerender(): void {
		var id = this.data;
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.teachersService.getTeacherExams(id).subscribe((examsList: DataTablesResponse) => {
				this.exams = examsList.content;
				this.response = examsList;
				this.show = false;
				this.dtTrigger.next();
			});
		});
		}

}
