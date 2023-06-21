import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DueStudentListService } from '../Due_monthly_report/Service/due-student-list.service';
import { Observable,Subject } from "rxjs";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FetchStudentlist, StudentList } from "./models/studentlist.interface";
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-Due_monthly_report',
  templateUrl: './Due_student_list.component.html',
  styleUrls: ['./Due_student_list.component.css'],
  providers: [DatePipe]
})
export class DueStudentListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective | undefined;
  @ViewChild('closebutton') closebutton: any;
  datatableElement: any = DataTableDirective;
  currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  form!: FormGroup;
  paymentForm!: FormGroup;
  submitted: boolean = false;
  searchDate: string = "";
  showAmountField = false;
  id: any;
  min: any = 0;
  max: any = 0;

  constructor(private elementRef: ElementRef, private dueStudentService: DueStudentListService, public fb: FormBuilder, 
              private datePipe: DatePipe,
              ) { 
    
  }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();
  students: Array<StudentList> =[];
  // students: any[] = []
  // student : StudentList=new StudentList();  
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false; 

  ngOnInit(): void {
    this.getDueStudentList();
    // this.addMonthlyDueDate();
    this.initForm();
    this.initPaymentForm();
  }

  initForm() {
    this.form = this.fb.group({
      searchDate : new FormControl((new Date()).toISOString().substring(0,10))
    });
  }

  initPaymentForm() {    
    this.paymentForm = this.fb.group({
      month: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });    
  }

  getDueStudentList() {  
    this.isupdated=false;  
    this.dtOptions = {  
      // dom: 'Bfrtip',
      // pageLength: 6,  
      // stateSave:true,  
      // lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      // processing: true
    };

    this.dueStudentService.getDueStudentList(this.currentDate).subscribe({
      next: (response: any) => {
        const studentList = response?.responseObject?.successResponse?.studentList;
        const studentsWithUnpaidFees: Array<StudentList> = [];
    
        studentList.forEach((student: any) => {
          this.students.push(student)
          // if (student.student_status) {
          //   // Check if the student has any unpaid fees
          //   const unpaidFees = student.student_monthly_paid.filter((payment: any)=> !payment.paid_status);
    
          //   // If there are any unpaid fees, push the student to the studentsWithUnpaidFees array
          //   if (unpaidFees.length > 0) {
          //     studentsWithUnpaidFees.push(student);
          //     this.students = studentsWithUnpaidFees
          //   }
          // }
        });
    
        console.log(studentsWithUnpaidFees);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    
  }
  
  sendSearchDate(){
    const rawDate = this.form.get('searchDate')?.value; // get the raw date value from the form control
    if (rawDate) { // check if the date value is not null or undefined
      const date = new Date(rawDate); // create a Date object from the raw date string
      const day = date.getDate().toString().padStart(2, '0'); // get the day of the month (with leading zero if necessary)
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // get the month (adding 1 because months are zero-indexed) with leading zero if necessary
      const year = date.getFullYear(); // get the full year
      const formattedDate = `${day}-${month}-${year}`; // construct the formatted date string
      this.currentDate = formattedDate; // assign the formatted date string to the currentDate variable
    }
  }

  addMonthlyDueDate() {
    console.log('Search date:', this.searchDate);
    this.dueStudentService.getDueStudentList(this.searchDate).subscribe({
      next: (response: any) => {
        const studentList = response?.responseObject?.successResponse?.studentList
        studentList.forEach((result:any) => {
          if(result.student_status) {
            const monthlyList = result.student_monthly_paid
            monthlyList.forEach((res:any) => {
              if (res.paid_status == false) {
                // this.students.push(result)
                console.log(res)            
              }
            })
            // if(result.student_joining_date == currentDate) {

            // }
          }
        })
        // console.log(this.students);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const option = selectElement.value;
    this.onSelect(option);
    if (option !== '') {
      this.showAmountField = true;
      // this.paymentForm.get('amount')?.setValue(0); // set amount value to 0
    } else {
      this.showAmountField = false;
      this.paymentForm.get('amount')?.reset(); // reset amount value
    }
  }
  
  onSelect(option: string): void {
    // Handle selected option
    this.showAmountField = option !== 'Select Month';
  }
   ids: any;
  dueId(id:any){
   this.ids= id;   
  }
  onSubmit(): void {
    const amount = this.paymentForm.get('amount')?.value; // get the value of the amount control
    const formData = { month: this.paymentForm.get('month')?.value, amount: amount };
    // const formData = this.paymentForm.value;
    console.log("data-",formData)
    const id =this.ids;
    this.dueStudentService.createPaymentStudent(id,formData).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(error);
        this.closebutton.nativeElement.click();
      }
    });
  }
  sendPaymentData() {
    const amountValue = this.paymentForm.get('amount')?.value;
    if (amountValue != null) {
      this.paymentForm.patchValue({
        amount: amountValue
      });
    }
  }
}
