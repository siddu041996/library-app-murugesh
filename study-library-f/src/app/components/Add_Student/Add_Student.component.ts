import { Component, OnInit } from '@angular/core';
import { AddStudentService } from '../Add_Student/Service/add-student.service';
import { observable, Observable,Subject } from "rxjs";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-Add_Student',
  templateUrl: './Add_Student.component.html',
  styleUrls: ['./Add_Student.component.css']
})
export class AddStudentComponent implements OnInit {
  public studentForm!: FormGroup;
  submitted: Boolean = false;
  students: any[] = []
  seatList: any[] = []
  // const student: Observable<Student>;
  addstudentForm: boolean = false;
  editstudentForm: boolean = false;
  viewstudentForm: boolean = false;
  studentID: any;
  viewStudentID: any;

  constructor(
    private studentservice: AddStudentService, 
    public fb: FormBuilder, 
    public toastr: ToastrService,
    private route: ActivatedRoute,
    ) { 
    
  }

  ngOnInit(): void {
    this.getStudentID();
    this.initForm();
    // this.submitted=false;
    // this.addstudentForm = true
    if(this.editstudentForm == true){
      this.getStudent();
    }
    if(this.viewstudentForm == true){
      this.viewStudent();
    }
    this.getSeatAllocatmentList();
  }

  getStudentID() {
    this.studentID = this.route.snapshot.params['studentID'];
    this.viewStudentID = this.route.snapshot.params['viewStudentID'];
    // this.studentID || this.studentID == 0 ? this.editstudentForm = true : this.editstudentForm = false
    // this.viewStudentID || this.viewStudentID == 0 ? this.viewstudentForm = true : this.viewstudentForm = false
    if (this.studentID || this.studentID == 0) {
      this.addstudentForm = false
      this.editstudentForm = true
      this.viewstudentForm = false
    }else if(this.viewStudentID || this.viewStudentID == 0){
      this.addstudentForm = false
      this.editstudentForm = false
      this.viewstudentForm = true
    }else {
      this.addstudentForm = true
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.studentForm.controls;
  }
  
  initForm() {
    this.studentForm = this.fb.group({
      studentId: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      seatnumber: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // student_termsandcondition: [''],
      // student_branch: [''],
      joiningDate: new FormControl((new Date()).toISOString().substring(0,10)),
      address: this.fb.group({
        // addressLine1: ['', [Validators.required]],
        // addressLine2: ['', [Validators.required]],
        // city: ['', [Validators.required]],
        // state: ['', [Validators.required]],
        // pinCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        pinCode: [''],
      }),
    });
  }

  onSeatNumberEntered(seatNumber: any) {
    const selectElement = seatNumber.target as HTMLSelectElement;
    const option = selectElement.value;
    console.log("Value",option)
  }
  
  saveStudent() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.studentForm.invalid) {
        return;
    }
    const date = new Date(this.studentForm.value.joiningDate) // create a Date object from the raw date string
    const day = date.getDate().toString().padStart(2, '0'); // get the day of the month (with leading zero if necessary)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // get the month (adding 1 because months are zero-indexed) with leading zero if necessary
    const year = date.getFullYear(); // get the full year
    const formattedDate = `${day}-${month}-${year}`; // construct the formatted date string
    const localDate = formattedDate; // assign the formatted date string to the currentDate variable
    this.studentForm.value.joiningDate = localDate

    const { firstName, lastName } = this.studentForm.value;
    this.studentForm.setValue({
      ...this.studentForm.value,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      subscriptionStatus: false,
      studentStatus: true
    });

    this.studentservice.createStudent(this.studentForm.value).subscribe({
      next: (response: any) => {
        // this.students = response?.responseObject?.successResponse?.studentList;
        // console.log(this.studentForm);
        if(response.status === "OK"){
          this.createSeatAllotment(response?.data?.studentId, this.studentForm.value.seatnumber)
        this.toastr.success(
          // response.data.firstName + ' successfully added!'
          // this.studentForm.controls['firstName'].value + ' successfully added!'
          ' successfully added!'
        );
        this.ResetForm();
        }
      },
      error: (error) => {
        console.log(error);
        this.ResetForm();
      }
    });
  }
  
  editStudent() {
    const id = this.studentID
    const payload = this.studentForm.value
    this.studentservice.editStudent(id, payload).subscribe({
      next: (response) => {
        // this.students = response?.responseObject?.successResponse?.studentList;
        console.log(this.studentForm.value);
        this.toastr.success(
          this.studentForm.controls['firstName'].value + ' successfully added!'
        );
        this.ResetForm();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(
          this.studentForm.controls['firstName'].value + ' successfully added!'
        );
      }
    });
  }
  
  getStudent() {
    // const id = this.studentID
    const id = "EID_@000015"
    this.studentservice.getStudent(id).subscribe({
      next: (response: any) => {
        const result = response?.data
        this.studentForm.patchValue(result)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  viewStudent(){
    // const id = this.viewStudentID 
    const id = "EID_@000015"
    this.studentservice.getStudent(id).subscribe({
      next: (response: any) => {
        const result = response?.data
        this.studentForm.patchValue(result)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  addStudentForm(){  
    this.submitted=true;
  }  
  
  editStudentForm(){  
    this.submitted=false;  
  }  

  getSeatAllocatmentList(){    
    this.studentservice.getSeatAllotmentList().subscribe({
      next: (response) => {
        const seatList = response?.data
        seatList.forEach((result:any) => {
            this.seatList.push(result)
        })
        console.log(this.seatList);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  createSeatAllotment(StudentID:number, SeatNumber:number){
    // const StudentID = 2
    const StudentInfo = {
      "branchCode": "SS01",
      "branchName": "Shree Shivayogi Study Library",
      "seatNumber": SeatNumber
    }
    this.studentservice.seatAllotment(StudentID, StudentInfo).subscribe({
      next: (response: any) => {
        if(response.status === "OK"){
          this.getSeatAllocatmentList()
          this.toastr.success(' successfully Seat Alloted!');
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  ResetForm() {
    this.studentForm.reset();
    this.submitted = false;
  }

}
