import { User } from 'src/app/model/user';
export class Teacher {
	id: number;
	first_name: string;
	last_name: string;
	user: User;
	deleted: boolean;
}
