import { FormGroup, FormBuilder} from '@angular/forms';
import { DataTablesResponse } from './../../../model/data-tables-response';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { StudentsService } from './../../../services/students.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { read } from 'fs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements  AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};

	dtTrigger: Subject<any> = new Subject<any>();

	show = false;

	selectedFile;

	uploadForm: FormGroup;

	public uploader: FileUploader = new FileUploader({
		isHTML5: true
	});

	documents;
	studentId;
	response: DataTablesResponse;
	file;


	constructor(
		private studentsService: StudentsService,
		private formBuilder: FormBuilder,
	) {
		this.uploadForm = this.formBuilder.group({
			document: ['']
		});
	 }

	ngOnInit(): void {
		this.studentId = localStorage.getItem('student_id');
		this.getDocuments();
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

	getDocuments(): void {
		this.studentsService.getDocuments(this.studentId).subscribe((documentsList: DataTablesResponse) => {
			this.documents = documentsList.content;
			this.response = documentsList;
		});
	}

	download(id, docname): void {
		this.studentsService.downloadDocument(id).subscribe(res => {
			this.showFile(res, docname);
		});
	}

	delete(id): void {
		this.studentsService.deleteDocument(id).subscribe(res => {
			alert('Succesfully deleted document!');
			this.rerender();
		});
	}

	showFile(blob, docname) {
		var newBlob = new Blob([blob], {type: 'application/pdf'});

		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(newBlob);
			return;
		}

		const data = window.URL.createObjectURL(newBlob);
		var link = document.createElement('a');
		link.href = data;
		link.download = docname;
		link.click();
		setTimeout(function() {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(data);
		}, 100);
	}

	showUploadFileForm() {
		this.show = !this.show;
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.studentsService.getDocuments(this.studentId).subscribe((documentsList: DataTablesResponse) => {
				this.documents = documentsList.content;
				this.response = documentsList;
				this.dtTrigger.next();
			});
		});
	}

	onFileSelect(event) {
		if (event.target.files.length > 0) {
			this.selectedFile = event.target.files[0];
		}
	}

	onSubmit() {
			let data = new FormData();
			data.append('file', this.uploader.queue[0]._file);
			console.log(this.selectedFile);
			this.studentsService.uploadDocument(data).subscribe(res => {
				alert('Succesfully uploaded document!');
				this.show = !this.show;
				location.reload();
			});
			this.uploader.clearQueue();
	}

}
