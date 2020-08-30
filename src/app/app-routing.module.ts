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
	{ path: 'student', component: StudentComponent},
	{ path: 'teacher', component: TeacherComponent},
	{ path: 'admin', component: AdminComponent,
		children: [
		{ path: 'teachers', component: TeachersAdminComponent, canActivate: [AuthGuard]},
		{ path: 'students', component: StudentsAdminComponent, canActivate: [AuthGuard]},
		{ path: 'users', component: UsersAdminComponent, canActivate: [AuthGuard]},
		{ path: 'courses', component: CoursesAdminComponent, canActivate: [AuthGuard]},
		{ path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard]},
		{ path: 'add-teacher', component: AddTeacherComponent, canActivate: [AuthGuard]},
		{ path: 'add-admin', component: AddAdminComponent, canActivate: [AuthGuard]},
	]},
	{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
