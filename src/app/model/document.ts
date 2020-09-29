import { Student } from './student';
export class Document {
	id: number;
	name: string;
	file: Blob;
	student: Student;
	deleted: boolean;
}
