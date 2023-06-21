import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  signinForm!: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) { 
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }
  
  loginUser() {
      this.submitted = true;
    
      // Stop here if form is invalid
      if (this.signinForm.invalid) {
        return;
      }
  
      this.loading = true;
    this.authService.signIn(this.signinForm.value);
  }

}
