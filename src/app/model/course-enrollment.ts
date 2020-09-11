export class CourseEnrollment {
	course_enrollment_id: number;
	student: { student_id: number};
	course: { course_id: number};
	deleted: boolean;
}
