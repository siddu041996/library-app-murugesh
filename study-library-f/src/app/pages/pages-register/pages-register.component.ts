import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      _id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
      role: [''],
      status: [''],
      user_joining_date: [''],
      Branch: this.fb.array([
        this.fb.group({
          branch1: [''],
        })
      ]),
    });
  }

  ngOnInit(): void {
  }

  registerUser() {
    const date = new Date((new Date()).toISOString().substring(0,10)); // create a Date object from the raw date string
    const day = date.getDate().toString().padStart(2, '0'); // get the day of the month (with leading zero if necessary)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // get the month (adding 1 because months are zero-indexed) with leading zero if necessary
    const year = date.getFullYear(); // get the full year
    const formattedDate = `${day}-${month}-${year}`; // construct the formatted date string
    const localDate = formattedDate; // assign the formatted date string to the currentDate variable
    this.signupForm.value.user_joining_date = localDate
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }

}
