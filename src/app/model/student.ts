import { User } from './user';

export class Student {
	id: number;
	first_name: string;
	last_name: string;
	index_number: string;
	account_balance: number;
	user: User;
	deleted: boolean;
}
