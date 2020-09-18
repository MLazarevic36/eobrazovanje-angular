import { User } from './../user/user';
export class Student {
	student_id: number;
	first_name: string;
	last_name: string;
	index_number: string;
	account_balance: number;
	user: User;
	documents?: [];
	examRegistrations?: [];
	deleted: boolean;
}
