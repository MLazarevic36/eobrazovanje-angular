import { LoginComponent } from './components/login/login.component';
import { appRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { UsersAdminComponent } from './components/admin/users/users-admin.component';
import { TeachersAdminComponent } from './components/admin/teachers/teachers-admin.component';
import { CoursesAdminComponent } from './components/admin/courses/courses-admin.component';
import { StudentsAdminComponent } from './components/admin/students/students-admin.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DataTablesModule } from 'angular-datatables';
import { AddStudentComponent } from './components/admin/add-student/add-student.component';
import { AddTeacherComponent } from './components/admin/add-teacher/add-teacher.component';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';




@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		appRoutingModule,
		DataTablesModule
	],
	declarations: [
		AppComponent,
		LoginComponent,
		AdminComponent,
		StudentComponent,
		TeacherComponent,
		UsersAdminComponent,
		TeachersAdminComponent,
		CoursesAdminComponent,
		StudentsAdminComponent,
		NavMenuComponent,
		AddStudentComponent,
		AddTeacherComponent,
		AddAdminComponent,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
