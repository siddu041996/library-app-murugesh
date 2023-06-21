import { Injectable } from '@angular/core';
import { User } from './../models/studentlist.interface';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfig } from '../app-config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router,
    public toastr: ToastrService,) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    // let api = `${this.endpoint}/pages-register`;
    let api = `${AppConfig.endpoints.Register}`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    if (user.username == "admin" || user.username == "user" ) {
      let token = "gfdtdytfwuydhvchvsvdhcgvhgeejhwejc"
      localStorage.setItem('access_token', token);
      localStorage.setItem('current_user', user.username);
      this.router.navigate(['dashboard']);
    }else{      
      this.toastr.error(
        'Invalid User!'
      );
    }
    return this.http
      .post<any>(`${AppConfig.endpoints.Login}`, user)
      .subscribe((res: any) => {
        res = {
          _id: 1,
          token: "gfdtdytfwuydhvchvsvdhcgvhgeejhwejc",
          email: "Admin@gmail.com"
        }
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['dashboard/' + res._id]);
        });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    // let api = `${this.endpoint}/user-profile/${id}`;
    let api = `${AppConfig.endpoints.User_profile}${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}