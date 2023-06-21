import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MonthlyListService } from '../Monthly_report/Service/monthly-list.service';
import { Observable,Subject } from "rxjs";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchStudentlist, StudentList } from "../../models/studentlist.interface";
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-Monthly_report',
  templateUrl: './Monthly_list.component.html',
  styleUrls: ['./Monthly_list.component.css']
})
export class MonthlyListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective | undefined;
  datatableElement: any = DataTableDirective;
  form! : FormGroup;
  currentMonth: string = "";
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  constructor(private elementRef: ElementRef, private monthlyservice: MonthlyListService, public fb: FormBuilder) { 
    
  }
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false;
  students: Array<StudentList> =[];

  ngOnInit(): void {
    this.initForm();
    this.getMonthlyList();
    
    this.isupdated=false;  
    // this.dtOptions = {  
    //   pageLength: 6,  
    //   stateSave:true,  
    //   lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
    //   processing: true  
    // };

    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../assets/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
  }

  initForm() {
    this.currentMonth = this.getMonthName(new Date().getMonth());

    // Set the default value of the presentMonth control to the current month
    this.form = this.fb.group({
      presentMonth : new FormControl(this.currentMonth)
    });
  }

  getMonthName(month: number): string {
    return this.months[month];
  }

  onSearchMonth() {
    this.currentMonth = this.form.controls['presentMonth'].value;
    this.getMonthlyList();
  }

  getMonthlyList() {
    this.dtOptions = {  
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5',
          text: 'Export to Excel',
          filename: 'my-data-export', // set the filename here
          exportOptions: {
            columns: ':visible'
          }
        },
        {
          extend: 'print',
          text: 'Print',
          exportOptions: {
            columns: ':visible'
          }
        },
        {
          extend: 'pdfHtml5',
          text: 'Export to PDF',
          filename: 'my-data-export',
          exportOptions: {
            columns: ':visible'
          }
        }
      ]
    } as any;
    this.monthlyservice.getMonthlyStudents(this.currentMonth).subscribe({
      next: (response: any) => {
        const studentList = response?.responseObject?.successResponse?.studentList
        studentList.forEach((result:any) => {
          // if(result.student_status) {
          if(true) {
            this.students.push(result)
          }
        })
        console.log(this.students);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
