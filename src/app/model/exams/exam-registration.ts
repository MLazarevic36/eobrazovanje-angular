export class ExamRegistration {
	exam_registration_id: number;
	colloquium_points: number;
	exam_points: number;
	grade: number;
	status: string;
	exam: { exam_id: number};
	student: {student_id: number};
	registered: boolean;
	deleted: boolean;
}
