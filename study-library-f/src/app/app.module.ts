import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { DataTablesModule } from 'angular-datatables';

// import { MaterialModule} from './material-module'

// Import below modules for NGX Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { StudentListComponent } from './components/Student_list/Student_list.component';
import { AddStudentComponent } from './components/Add_Student/Add_Student.component';
import { MonthlyListComponent } from './components/Monthly_report/Monthly_list.component';
import { DueStudentListComponent } from './components/Due_monthly_report/Due_student_list.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
// 
@NgModule({
  declarations: [
    AppComponent,

    StudentListComponent,
    AddStudentComponent,
    MonthlyListComponent,
    DueStudentListComponent,
    
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,

    // AlertsComponent,
    // AccordionComponent,
    // BadgesComponent,
    // BreadcrumbsComponent,
    // ButtonsComponent,
    // CardsComponent,
    // CarouselComponent,
    // ListGroupComponent,
    // ModalComponent,
    // TabsComponent,
    // PaginationComponent,
    // ProgressComponent,
    // SpinnersComponent,
    // TooltipsComponent,
    // FormsElementsComponent,
    // FormsLayoutsComponent,
    // FormsEditorsComponent,
    TablesGeneralComponent,
    // TablesDataComponent,
    // ChartsChartjsComponent,
    // ChartsApexchartsComponent,
    // IconsBootstrapComponent,
    // IconsRemixComponent,
    // IconsBoxiconsComponent,
    // UsersProfileComponent,
    // PagesFaqComponent,
    // PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    // PagesError404Component,
    // PagesBlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    DataTablesModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    // MaterialModule // material ui library

  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
