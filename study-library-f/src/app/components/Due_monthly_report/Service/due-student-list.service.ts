import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { All_StudentsList } from '../models/studentlist.mock'

@Injectable({
  providedIn: 'root'
})
export class DueStudentListService {

  private baseUrl = 'http://localhost:8080/api/';  

  constructor(private http: HttpClient) { }

  getDueStudentList(date: any): Observable<any> {  
    // return this.http.get(`${this.baseUrl}due-students-list/${date}`);
    return of(All_StudentsList) 
  }  
  
  createPaymentStudent(id: number,paymentstudent: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}payment-student/${id}`, paymentstudent);  
  }  
  
  deleteStudent(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });  
  }  
  
  getStudent(id: number): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/student/${id}`);  
  }  
  
  updateStudent(id: number, value: any): Observable<Object> {  
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);  
  } 
}
