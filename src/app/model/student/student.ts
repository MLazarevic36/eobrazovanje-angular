export class Student {
	student_id: number;
	firstName: string;
	lastName: string;
	indexNumber: string;
	accountBalance: number;
	userId: number;
	enrollments?: [];
	documents?: [];
	transactions?: [];
	exams?: [];
	deleted: boolean;
}
