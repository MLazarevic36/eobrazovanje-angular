export class Teacher {
	teacher_id: number;
	first_name: string;
	last_name: string;
	user: { id: number};
	engagements?: [];
	deleted: boolean;
}
