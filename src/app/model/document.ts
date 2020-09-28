import { Student } from './student/student';
export class Document {
	document_id: number;
	name: string;
	file: Blob;
	student: Student;
	deleted: boolean;
}
