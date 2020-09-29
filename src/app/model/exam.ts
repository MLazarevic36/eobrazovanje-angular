import { Course } from './course';

export class Exam {
	id: number;
	course: Course;
	date: Date;
	location: string;
	price: number;
	term: number;
	deleted: boolean;
}
