import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
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
import { RegisterExamComponent } from './components/student/register-exam/register-exam.component';
import { ViewCourseEnrollmentsComponent } from './components/student/view-course-enrollments/view-course-enrollments.component';
import { ViewTransactionsComponent } from './components/student/view-transactions/view-transactions.component';
import { ViewEngagementsComponent } from './components/teacher/view-engagements/view-engagements.component';
import { ViewDetailedCourseComponent } from './components/teacher/view-detailed-course/view-detailed-course.component';
import { ExamAdministrationComponent } from './components/teacher/exam-administration/exam-administration.component';
import { UpdateExamsComponent } from './components/teacher/update-exams/update-exams.component';
import { TeacherChooseCourseService } from './services/teacher-choose-service';




@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		appRoutingModule,
		DataTablesModule,
		MaterialModule,
		MatNativeDateModule
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
		RegisterExamComponent,
		ViewCourseEnrollmentsComponent,
		ViewTransactionsComponent,
		ViewEngagementsComponent,
		ViewDetailedCourseComponent,
		ExamAdministrationComponent,
		UpdateExamsComponent,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
		[ TeacherChooseCourseService]
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
