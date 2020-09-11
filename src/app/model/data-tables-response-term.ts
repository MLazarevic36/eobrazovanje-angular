import { Term } from './exams/term';
export class DataTablesResponseTerm {
	content: Term[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
  }
