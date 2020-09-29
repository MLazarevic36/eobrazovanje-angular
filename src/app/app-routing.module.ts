import { CourseComponent } from './components/course/course.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DocumentsComponent } from './components/student/documents/documents.component';
import { TransactionsAdminComponent } from './components/admin/transactions/transactions-admin.component';
import { EngagementsAdminComponent } from './components/admin/engagements/engagements-admin.component';
import { EnrollmentsAdminComponent } from './components/admin/enrollments/enrollments-admin.component';
import { PassedExamsComponent } from './components/student/passed-exams/passed-exams.component';
import { UnregisterExamComponent } from './components/student/unregister-exam/unregister-exam.component';
import { UpdateExamsComponent } from './components/teacher/update-exams/update-exams.component';
import { ExamAdministrationComponent } from './components/teacher/exam-administration/exam-administration.component';
import { ViewEngagementsComponent } from './components/teacher/view-engagements/view-engagements.component';
import { ViewTransactionsComponent } from './components/student/view-transactions/view-transactions.component';
import { ViewCourseEnrollmentsComponent } from './components/student/view-course-enrollments/view-course-enrollments.component';
import { RegisterExamComponent } from './components/student/register-exam/register-exam.component';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import { AddTeacherComponent } from './components/admin/add-teacher/add-teacher.component';
import { AddStudentComponent } from './components/admin/add-student/add-student.component';
import { CoursesAdminComponent } from './components/admin/courses/courses-admin.component';
import { UsersAdminComponent } from './components/admin/users/users-admin.component';
import { StudentsAdminComponent } from './components/admin/students/students-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { AuthGuard } from './helpers/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TeachersAdminComponent } from './components/admin/teachers/teachers-admin.component';

const routes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'student', component: StudentComponent,
		children: [
		{ path: 'register-exams', component: RegisterExamComponent, canActivate: [AuthGuard]},
		{ path: 'enrollments', component: ViewCourseEnrollmentsComponent, canActivate: [AuthGuard]},
		{ path: 'transactions', component: ViewTransactionsComponent, canActivate: [AuthGuard]},
		{ path: 'unregister-exams', component: UnregisterExamComponent, canActivate: [AuthGuard]},
		{ path: 'passed-exams', component: PassedExamsComponent, canActivate: [AuthGuard]},
		{ path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
	]},
	{ path: 'teacher', component: TeacherComponent,
		children: [
		{ path: 'engagements', component: ViewEngagementsComponent, canActivate: [AuthGuard]},
		{ path: 'exams', component: ExamAdministrationComponent, canActivate: [AuthGuard]},
		{ path: 'update', component: UpdateExamsComponent, canActivate: [AuthGuard]},
	]},
	{ path: 'admin', component: AdminComponent,
		children: [
		{ path: 'teachers', component: TeachersAdminComponent, canActivate: [AuthGuard]},
		{ path: 'students', component: StudentsAdminComponent, canActivate: [AuthGuard]},
		{ path: 'users', component: UsersAdminComponent, canActivate: [AuthGuard]},
		{ path: 'courses', component: CoursesAdminComponent, canActivate: [AuthGuard]},
		{ path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard]},
		{ path: 'add-teacher', component: AddTeacherComponent, canActivate: [AuthGuard]},
		{ path: 'add-admin', component: AddAdminComponent, canActivate: [AuthGuard]},
		{ path: 'enrollments', component: EnrollmentsAdminComponent, canActivate: [AuthGuard]},
		{ path: 'engagements', component: EngagementsAdminComponent, canActivate: [AuthGuard]},
		{ path: 'transactions', component: TransactionsAdminComponent, canActivate: [AuthGuard]},
	]},
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
	{ path: 'course/:id', component: CourseComponent, canActivate: [AuthGuard]},
	{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
