import { Exam } from './exam';
import { ExamRegistration } from './exam-registration';

export class Term {
	term_id: number;
	term_name: string;
	start_date: Date;
	end_date: Date;
	exams: Exam[];
	exam_registrations: ExamRegistration[];
	deleted: boolean;
}
