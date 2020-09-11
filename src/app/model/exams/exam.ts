import { Course } from '../course';

export class Exam {
	exam_id: number;
	course: Course;
	date: Date;
	location: string;
	price: number;
	term: number;
	examRegistrations?: [];
	deleted: boolean;
}
