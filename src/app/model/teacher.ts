import { User } from 'src/app/model/user/user';
export class Teacher {
	teacher_id: number;
	first_name: string;
	last_name: string;
	user: User;
	engagements?: [];
	deleted: boolean;
}
