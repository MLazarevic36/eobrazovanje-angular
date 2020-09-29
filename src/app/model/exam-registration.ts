import { Student } from './student';
import { Exam } from 'src/app/model/exam';

export class ExamRegistration {
	id: number;
	colloquium_points: number;
	exam_points: number;
	grade: number;
	status: string;
	exam: {id: number};
	student: {id: number};
	registered: boolean;
	deleted: boolean;
}
