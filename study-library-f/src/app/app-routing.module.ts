import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./shared/auth.guard";
import { DataTablesModule } from "angular-datatables";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './components/Student_list/Student_list.component';
import { AddStudentComponent } from './components/Add_Student/Add_Student.component';
import { MonthlyListComponent } from './components/Monthly_report/Monthly_list.component';
import { DueStudentListComponent } from './components/Due_monthly_report/Due_student_list.component';


import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Student-list', component: StudentListComponent },
  { path: 'Add-Student/:studentID/editStudent', component: AddStudentComponent },
  { path: 'Add-Student/:viewStudentID/viewStudent', component: AddStudentComponent },
  { path: 'Add-Student', component: AddStudentComponent },
  { path: 'Monthly-Student-list', component: MonthlyListComponent },
  { path: 'Due-Student-list', component: DueStudentListComponent },
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'user-profile', component: UsersProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DataTablesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
