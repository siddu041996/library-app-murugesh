import { Component, OnInit, ElementRef } from '@angular/core';
import { StudentListService } from '../Student_list/Service/student-list.service';
import { Observable,Subject } from "rxjs";  
  
import {FormControl,FormGroup,Validators} from '@angular/forms';  
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-Student_list',
  templateUrl: './Student_list.component.html',
  styleUrls: ['./Student_list.component.css']
})
export class StudentListComponent implements OnInit {
  datatableElement: any = DataTableDirective;

  constructor(private elementRef: ElementRef, private studentservice: StudentListService) { }
     
  studentsArray: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  
  // students: Observable<StudentList[]>;
  students: any[] = []
  // student : StudentList=new StudentList();  
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false;
  status: string = "Active";

  ngOnInit(): void {
    this.getStudentList();

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  getStudentList() {
    
    this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };
    
    this.studentservice.getStudentList(this.status).subscribe({
      next: (response) => {
        // const studentList = response?.responseObject?.successResponse?.studentList
        const studentList = response?.data
        studentList.forEach((result:any) => {
            this.students.push(result)
        })
        console.log(this.students);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterById(): void {
    this.status = this.status === "Active" ? "Deactive" : "Active";
    this.getStudentList();
  }
}
